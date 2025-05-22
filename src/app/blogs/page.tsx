import { client } from "@/lib/sanity.config";
import { blogsQuery } from "@/lib/queries/blogs";
import BlogsClient from "./BlogsClient";

interface Blog {
	_id: string;
	title: string;
	slug: string;
	summary: string;
	image: string;
	imageAlt: string;
	author: string;
	publishedAt: string;
	tags: string[];
}

// Enable static generation with on-demand revalidation
export const dynamic = "force-static";
export const revalidate = false;

// Generate static params for all blog posts
export async function generateStaticParams() {
	const blogs = await client.fetch<Blog[]>(blogsQuery);
	return blogs.map((blog) => ({
		slug: blog.slug,
	}));
}

export default async function BlogsPage() {
	// Fetch blogs from Sanity
	const blogs = await client.fetch<Blog[]>(blogsQuery);

	return <BlogsClient initialBlogs={blogs} />;
}
