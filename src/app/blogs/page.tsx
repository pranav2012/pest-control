import { getBlogsData } from "@/lib/data";
import BlogsClient from "./BlogsClient";

export default async function BlogsPage() {
	const blogs = await getBlogsData();
	return <BlogsClient blogs={blogs} />;
}

// This runs at build time only
export async function generateStaticParams() {
	const blogs = await getBlogsData();
	return blogs.map((blog) => ({
		slug: blog.slug,
	}));
}

// This runs at build time only
export async function generateMetadata() {
	return {
		title: "Blogs",
		description: "Explore our collection of blog posts",
	};
}
