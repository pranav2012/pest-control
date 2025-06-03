import { createClient } from "@sanity/client";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import dotenv from "dotenv";

// Load environment variables from .env.local file
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sanity client
const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	apiVersion: "2024-03-20",
	token: process.env.SANITY_API_TOKEN,
	useCdn: false,
});

// Queries
const getServicesData = `*[_type == "services"][0] {
	section_title,
	services[] {
		_key,
		title,
		"slug": slug.current,
		date,
		about_service[] {
			...,
			_type == "image" => {
				...,
				"src": {
					"asset": asset->
				}
			}
		},
		description,
		image {
			"src": src.asset->url,
			alt
		},
		details {
			pests_covered,
			service_features,
			treatment_process,
			warranty,
			pricing[] {
				_key,
				type,
				price,
				includes
			},
			treatment_details[] {
				title,
				description,
				image {
					"src": asset->url,
					alt
				}
			},
			maintenance_contracts[] {
				title,
				description,
				price,
				features
			}
		}
	},
	cta_button {
		text,
		link
	}
}`;

const blogsQuery = `*[_type == "blogs"][0].blogs[] | order(publishedAt desc) {
	_key,
	title,
	"slug": slug.current,
	summary,
	"image": image.asset->url,
	"imageAlt": image.alt,
	content,
	author,
	publishedAt,
	tags
}`;

// Create data directory if it doesn't exist
async function ensureDirectoryExists(dirPath) {
	try {
		await fs.access(dirPath);
	} catch {
		await fs.mkdir(dirPath, { recursive: true });
	}
}

// Process images in batches
async function processBatch(items, processFn, batchSize = 2) {
	const results = [];
	for (let i = 0; i < items.length; i += batchSize) {
		const batch = items.slice(i, i + batchSize);
		const batchResults = await Promise.all(batch.map(processFn));
		results.push(...batchResults);
		// Force garbage collection between batches
		if (global.gc) {
			global.gc();
		}
	}
	return results;
}

// Download and optimize image with minimal memory usage
async function downloadAndOptimizeImage(url, outputPath) {
	try {
		// Check if file already exists
		try {
			await fs.access(outputPath);
			console.log(`Image already exists at ${outputPath}, skipping...`);
			const publicPath = path.relative(
				path.join(__dirname, "..", "public"),
				outputPath
			);
			return `/${publicPath}`;
		} catch {
			// File doesn't exist, proceed with download and processing
			const response = await fetch(url);
			const buffer = await response.arrayBuffer();

			// Optimize image using sharp with minimal memory settings but maintaining quality
			await sharp(Buffer.from(buffer), {
				limitInputPixels: 5000000, // 5MP limit
				sequentialRead: true,
				limitMemory: true, // Enable memory limiting
			})
				.resize(1200, 800, {
					// Restored original dimensions
					fit: "inside",
					withoutEnlargement: true,
					fastShrinkOnLoad: true,
				})
				.jpeg({
					quality: 80, // Restored original quality
					progressive: true,
					optimizeScans: true,
				})
				.toFile(outputPath);

			const publicPath = path.relative(
				path.join(__dirname, "..", "public"),
				outputPath
			);
			return `/${publicPath}`;
		}
	} catch (error) {
		console.error(`Error processing image ${url}:`, error);
		return url;
	}
}

// Process services data in batches
async function processServicesData() {
	const servicesData = await client.fetch(getServicesData);

	// Process services in batches
	await processBatch(
		servicesData.services,
		async (service) => {
			if (service.image?.src) {
				const imagePath = path.join(
					__dirname,
					"..",
					"public",
					"images",
					"services",
					`${service.slug}.jpg`
				);
				await ensureDirectoryExists(path.dirname(imagePath));
				service.image.src = await downloadAndOptimizeImage(
					service.image.src,
					imagePath
				);
			}

			// Process treatment details in batches
			if (service.details?.treatment_details) {
				await processBatch(
					service.details.treatment_details,
					async (detail) => {
						if (detail.image?.src) {
							const imagePath = path.join(
								__dirname,
								"..",
								"public",
								"images",
								"services",
								`${service.slug}-${detail.title.toLowerCase().replace(/\s+/g, "-")}.jpg`
							);
							await ensureDirectoryExists(
								path.dirname(imagePath)
							);
							detail.image.src = await downloadAndOptimizeImage(
								detail.image.src,
								imagePath
							);
						}
					},
					1
				); // Process one treatment detail at a time
			}
		},
		1
	); // Process one service at a time

	return servicesData;
}

// Process blogs data in batches
async function processBlogsData() {
	const blogs = await client.fetch(blogsQuery);

	await processBatch(
		blogs,
		async (blog) => {
			if (blog.image) {
				const imagePath = path.join(
					__dirname,
					"..",
					"public",
					"images",
					"blogs",
					`${blog.slug}.jpg`
				);
				await ensureDirectoryExists(path.dirname(imagePath));
				blog.image = await downloadAndOptimizeImage(
					blog.image,
					imagePath
				);
			}
		},
		1
	); // Process one blog at a time

	return blogs;
}

// Main function to fetch and save all data
async function fetchAndSaveData() {
	try {
		// Create necessary directories
		await ensureDirectoryExists(path.join(__dirname, "..", "data"));
		await ensureDirectoryExists(
			path.join(__dirname, "..", "public", "images", "services")
		);
		await ensureDirectoryExists(
			path.join(__dirname, "..", "public", "images", "blogs")
		);

		// Process data sequentially instead of in parallel
		const servicesData = await processServicesData();
		const blogsData = await processBlogsData();

		// Save data to JSON files
		await fs.writeFile(
			path.join(__dirname, "..", "data", "services.json"),
			JSON.stringify(servicesData, null, 2)
		);
		await fs.writeFile(
			path.join(__dirname, "..", "data", "blogs.json"),
			JSON.stringify(blogsData, null, 2)
		);

		console.log("Successfully fetched and saved all data");
	} catch (error) {
		console.error("Error fetching and saving data:", error);
		process.exit(1);
	}
}

// Run the script
fetchAndSaveData();
