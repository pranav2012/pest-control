import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sanity client
const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	apiVersion: "2024-03-20",
	token: process.env.SANITY_API_TOKEN, // You'll need to create this token in Sanity
	useCdn: false,
});

// Promisify https.get
const httpsGet = promisify(https.get);

async function downloadImage(url) {
	return new Promise((resolve, reject) => {
		https
			.get(url, (response) => {
				if (response.statusCode !== 200) {
					reject(
						new Error(
							`Failed to download image: ${response.statusCode}`
						)
					);
					return;
				}

				const chunks = [];
				response.on("data", (chunk) => chunks.push(chunk));
				response.on("end", () => resolve(Buffer.concat(chunks)));
				response.on("error", reject);
			})
			.on("error", reject);
	});
}

async function uploadImage(imageUrl, alt) {
	try {
		console.log(`Attempting to upload image from: ${imageUrl}`);

		let imageBuffer;
		let filename;

		// Handle local images
		if (imageUrl.startsWith("/")) {
			const localPath = path.join(__dirname, "..", "public", imageUrl);
			console.log(`Reading local image from: ${localPath}`);
			imageBuffer = fs.readFileSync(localPath);
			filename = path.basename(imageUrl);
		} else {
			// Handle remote images
			console.log(`Downloading remote image from: ${imageUrl}`);
			imageBuffer = await downloadImage(imageUrl);
			filename = imageUrl.split("/").pop();
		}

		// Upload to Sanity
		const imageAsset = await client.assets.upload("image", imageBuffer, {
			filename: filename,
		});

		console.log(`Successfully uploaded image: ${filename}`);

		return {
			src: {
				_type: "image",
				asset: {
					_type: "reference",
					_ref: imageAsset._id,
				},
			},
			alt,
		};
	} catch (error) {
		console.error(`Error uploading image ${imageUrl}:`, error);
		throw error;
	}
}

// Helper function to process array items with _key and value
function processArrayItems(items) {
	if (!items) return [];
	return items.map((item) => {
		if (typeof item === "string") {
			return {
				_key: item.toLowerCase().replace(/\s+/g, "-"),
				value: item,
			};
		}
		return item; // Already has _key and value
	});
}

async function migrateServices() {
	try {
		// Read the JSON file
		const servicesData = JSON.parse(
			fs.readFileSync(
				path.join(__dirname, "..", "src", "content", "services.json"),
				"utf-8"
			)
		);

		console.log("Starting image uploads...");
		// Upload all images first
		const imageUploadPromises = servicesData.services.map(
			async (service) => {
				console.log(`Processing service: ${service.title}`);
				const imageUrl = service.image.src;
				const imageData = await uploadImage(
					imageUrl,
					service.image.alt
				);
				return {
					...service,
					image: imageData,
				};
			}
		);

		const servicesWithImages = await Promise.all(imageUploadPromises);
		console.log("All images uploaded successfully");

		// Create the document in Sanity
		const document = {
			_type: "services",
			section_title: servicesData.section_title,
			services: servicesWithImages.map((service) => ({
				_key:
					service._key ||
					service.title.toLowerCase().replace(/\s+/g, "-"),
				title: service.title,
				slug: {
					_type: "slug",
					current: service.title.toLowerCase().replace(/\s+/g, "-"),
				},
				date: service.date || new Date().toISOString().split("T")[0], // Default to today if no date provided
				about_service: service.about_service || [],
				description: service.description,
				image: service.image,
				details: {
					pests_covered: service.details.pests_covered || [],
					service_features: service.details.service_features || [],
					treatment_process: service.details.treatment_process || [],
					warranty: service.details.warranty || "",
					pricing: service.details.pricing
						? service.details.pricing.map((price) => ({
								_key:
									price._key ||
									price.type
										.toLowerCase()
										.replace(/\s+/g, "-"),
								type: price.type,
								price: price.price,
								includes: price.includes || [],
							}))
						: [],
					treatment_details: service.details.treatment_details
						? service.details.treatment_details.map((detail) => ({
								_key: detail.title
									.toLowerCase()
									.replace(/\s+/g, "-"),
								title: detail.title,
								description: detail.description,
								image: detail.image,
							}))
						: [],
					maintenance_contracts: service.details.maintenance_contracts
						? service.details.maintenance_contracts.map(
								(contract) => ({
									_key: contract.title
										.toLowerCase()
										.replace(/\s+/g, "-"),
									title: contract.title,
									description: contract.description,
									price: contract.price,
									features: contract.features || [],
								})
							)
						: [],
				},
			})),
		};

		// Check if a services document already exists
		const existingDocs = await client.fetch('*[_type == "services"]');

		if (existingDocs.length > 0) {
			// Update existing document
			const existingDoc = existingDocs[0];
			await client.patch(existingDoc._id).set(document).commit();
			console.log("Updated existing services document");
		} else {
			// Create new document
			await client.create(document);
			console.log("Created new services document");
		}

		console.log("Migration completed successfully!");
	} catch (error) {
		console.error("Error during migration:", error);
		process.exit(1);
	}
}

// Run the migration
migrateServices();
