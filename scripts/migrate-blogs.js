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
	token: process.env.SANITY_API_TOKEN,
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
			_type: "image",
			asset: {
				_type: "reference",
				_ref: imageAsset._id,
			},
			alt,
		};
	} catch (error) {
		console.error(`Error uploading image ${imagePath}:`, error);
		throw error;
	}
}

async function migrateBlogs() {
	try {
		// Sample blog data - replace this with your actual blog data
		const blogs = [
			{
				title: "How to treat Fungal infected Walls and Wood",
				slug: {
					_type: "slug",
					current: "how-to-treat-fungal-infected-walls-and-wood",
				},
				summary:
					"Learn about effective treatments for fungal infections in walls and wood, including identification, prevention, and professional solutions.",
				image: "/images/blogs/fungal-infected-wall.png",
				content: [
					{
						_type: "block",
						_key: "intro",
						style: "normal",
						children: [
							{
								_type: "span",
								_key: "intro-text",
								text: "Fungal infections in walls and wood can be a serious problem if left untreated. In this comprehensive guide, we'll explore the causes, signs, and effective treatment methods.",
							},
						],
					},
					{
						_type: "block",
						_key: "causes",
						style: "h2",
						children: [
							{
								_type: "span",
								_key: "causes-title",
								text: "Common Causes of Fungal Growth",
							},
						],
					},
					{
						_type: "block",
						_key: "causes-content",
						style: "normal",
						children: [
							{
								_type: "span",
								_key: "causes-text",
								text: "Understanding the root causes is crucial for effective treatment and prevention.",
							},
						],
					},
				],
				author: "Pest Control Expert",
				publishedAt: new Date().toISOString(),
				tags: ["Fungal Treatment", "Wood Care", "Home Maintenance"],
			},
		];

		console.log("Starting image uploads...");
		// Upload all images first
		const imageUploadPromises = blogs.map(async (blog) => {
			console.log(`Processing blog: ${blog.title}`);
			const imageData = await uploadImage(blog.image, blog.title);
			return {
				...blog,
				image: imageData,
			};
		});

		const blogsWithImages = await Promise.all(imageUploadPromises);
		console.log("All images uploaded successfully");

		// Create or update each blog document
		for (const blog of blogsWithImages) {
			// Check if blog already exists
			const existingBlog = await client.fetch(
				`*[_type == "blog" && slug.current == $slug][0]`,
				{ slug: blog.slug.current }
			);

			if (existingBlog) {
				// Update existing blog
				await client
					.patch(existingBlog._id)
					.set({
						_type: "blog",
						title: blog.title,
						slug: blog.slug,
						summary: blog.summary,
						image: blog.image,
						content: blog.content,
						author: blog.author,
						publishedAt: blog.publishedAt,
						tags: blog.tags,
					})
					.commit();
				console.log(`Updated blog: ${blog.title}`);
			} else {
				// Create new blog
				await client.create({
					_type: "blog",
					title: blog.title,
					slug: blog.slug,
					summary: blog.summary,
					image: blog.image,
					content: blog.content,
					author: blog.author,
					publishedAt: blog.publishedAt,
					tags: blog.tags,
				});
				console.log(`Created blog: ${blog.title}`);
			}
		}

		console.log("Blog migration completed successfully!");
	} catch (error) {
		console.error("Error during blog migration:", error);
		process.exit(1);
	}
}

// Run the migration
migrateBlogs();
