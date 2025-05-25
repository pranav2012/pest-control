import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

async function uploadImage(imagePath, alt) {
	try {
		// Remove leading slash if present
		const cleanPath = imagePath.startsWith("/")
			? imagePath.slice(1)
			: imagePath;
		const fullPath = path.join(__dirname, "..", "public", cleanPath);

		console.log(`Attempting to upload image from: ${fullPath}`);

		if (!fs.existsSync(fullPath)) {
			throw new Error(`Image file not found at path: ${fullPath}`);
		}

		const imageBuffer = fs.readFileSync(fullPath);
		const imageAsset = await client.assets.upload("image", imageBuffer, {
			filename: path.basename(cleanPath),
		});

		console.log(`Successfully uploaded image: ${cleanPath}`);

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
		console.error(`Error uploading image ${imagePath}:`, error);
		throw error;
	}
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
				const imagePath = service.image.src;
				const imageData = await uploadImage(
					imagePath,
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
			services: servicesWithImages.map((service, index) => ({
				_key: `service-${index}`,
				title: service.title,
				slug: {
					_type: "slug",
					current: service.title.toLowerCase().replace(/\s+/g, "-"),
				},
				description: service.description,
				image: service.image,
				details: {
					pests_covered: service.details.pests_covered,
					areas_covered: service.details.areas_covered,
					service_features: service.details.service_features,
					treatment_process: service.details.treatment_process,
					warranty: service.details.warranty,
					service_area: service.details.service_area,
				},
			})),
			cta_button: servicesData.cta_button,
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
