import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@sanity/client";

// Initialize Sanity client
const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	apiVersion: "2024-03-20",
	token: process.env.SANITY_API_TOKEN,
	useCdn: false,
});

async function deleteServicesDocument() {
	try {
		// Fetch all services documents (both draft and published)
		const existingDocs = await client.fetch('*[_type == "services"]');
		if (existingDocs.length === 0) {
			console.log("No services document found to delete.");
			return;
		}

		// Delete all versions of the document
		for (const doc of existingDocs) {
			await client.delete(doc._id);
			console.log(`Deleted document with ID: ${doc._id}`);
		}

		console.log("All services documents deleted successfully.");
	} catch (error) {
		console.error("Error deleting services document:", error);
		process.exit(1);
	}
}

// Run the deletion
deleteServicesDocument();
