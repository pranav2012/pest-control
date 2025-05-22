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

async function deleteBlogsDocument() {
	try {
		// Fetch all blog documents (both draft and published)
		const existingDocs = await client.fetch('*[_type == "blog"]');
		if (existingDocs.length === 0) {
			console.log("No blog documents found to delete.");
			return;
		}

		// Delete all versions of the document
		for (const doc of existingDocs) {
			await client.delete(doc._id);
			console.log(`Deleted blog: ${doc.title || doc._id}`);
		}

		console.log("All blog documents deleted successfully.");
	} catch (error) {
		console.error("Error deleting blog documents:", error);
		process.exit(1);
	}
}

// Run the deletion
deleteBlogsDocument();
