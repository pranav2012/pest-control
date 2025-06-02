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

const getProcessData = `*[_type == "process"][0] {
	section_title,
	steps[] {
		title,
		description,
		"icon": icon.asset->url
	},
	side_image {
		"src": src.asset->url,
		alt
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

// Download and optimize image
async function downloadAndOptimizeImage(url, outputPath) {
	try {
		const response = await fetch(url);
		const buffer = await response.arrayBuffer();

		// Optimize image using sharp
		await sharp(Buffer.from(buffer))
			.resize(1200, 800, { fit: "inside", withoutEnlargement: true })
			.jpeg({ quality: 80, progressive: true })
			.toFile(outputPath);

		// Convert the path to be relative to the public directory and ensure it starts with a forward slash
		const publicPath = path.relative(
			path.join(__dirname, "..", "public"),
			outputPath
		);
		return `/${publicPath}`;
	} catch (error) {
		console.error(`Error processing image ${url}:`, error);
		return url; // Return original URL if processing fails
	}
}

// Process services data
async function processServicesData() {
	const servicesData = await client.fetch(getServicesData);

	// Process images in services
	for (const service of servicesData.services) {
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

		// Process treatment details images
		if (service.details?.treatment_details) {
			for (const detail of service.details.treatment_details) {
				if (detail.image?.src) {
					const imagePath = path.join(
						__dirname,
						"..",
						"public",
						"images",
						"services",
						`${service.slug}-${detail.title.toLowerCase().replace(/\s+/g, "-")}.jpg`
					);
					await ensureDirectoryExists(path.dirname(imagePath));
					detail.image.src = await downloadAndOptimizeImage(
						detail.image.src,
						imagePath
					);
				}
			}
		}
	}

	return servicesData;
}

// Process process data
async function processProcessData() {
	const processData = await client.fetch(getProcessData);

	// Process side image
	if (processData.side_image?.src) {
		const imagePath = path.join(
			__dirname,
			"..",
			"public",
			"images",
			"process",
			"side-image.jpg"
		);
		await ensureDirectoryExists(path.dirname(imagePath));
		processData.side_image.src = await downloadAndOptimizeImage(
			processData.side_image.src,
			imagePath
		);
	}

	// Process step icons
	for (const step of processData.steps) {
		if (step.icon) {
			const imagePath = path.join(
				__dirname,
				"..",
				"public",
				"images",
				"process",
				`${step.title.toLowerCase().replace(/\s+/g, "-")}.jpg`
			);
			await ensureDirectoryExists(path.dirname(imagePath));
			step.icon = await downloadAndOptimizeImage(step.icon, imagePath);
		}
	}

	return processData;
}

// Process blogs data
async function processBlogsData() {
	const blogs = await client.fetch(blogsQuery);

	for (const blog of blogs) {
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
			blog.image = await downloadAndOptimizeImage(blog.image, imagePath);
		}
	}

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
			path.join(__dirname, "..", "public", "images", "process")
		);
		await ensureDirectoryExists(
			path.join(__dirname, "..", "public", "images", "blogs")
		);

		// Fetch and process data
		const [servicesData, processData, blogsData] = await Promise.all([
			processServicesData(),
			processProcessData(),
			processBlogsData(),
		]);

		// Save data to JSON files
		await Promise.all([
			fs.writeFile(
				path.join(__dirname, "..", "data", "services.json"),
				JSON.stringify(servicesData, null, 2)
			),
			fs.writeFile(
				path.join(__dirname, "..", "data", "process.json"),
				JSON.stringify(processData, null, 2)
			),
			fs.writeFile(
				path.join(__dirname, "..", "data", "blogs.json"),
				JSON.stringify(blogsData, null, 2)
			),
		]);

		console.log("Successfully fetched and saved all data");
	} catch (error) {
		console.error("Error fetching and saving data:", error);
		process.exit(1);
	}
}

// Run the script
fetchAndSaveData();
