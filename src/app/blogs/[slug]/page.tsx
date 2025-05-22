import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.config";
import { blogBySlugQuery } from "@/lib/queries/blogs";
import { PortableText } from "@portabletext/react";

interface BlogPost {
	_id: string;
	title: string;
	slug: string;
	summary: string;
	image: string;
	imageAlt: string;
	content: any;
	author: string;
	publishedAt: string;
	tags: string[];
}

async function getBlogPost(slug: string) {
	console.log("Fetching blog with slug:", slug);
	const blog = await client.fetch<BlogPost>(blogBySlugQuery, { slug });
	console.log("Fetched blog data:", blog);

	if (!blog) {
		console.log("No blog found for slug:", slug);
		notFound();
	}

	return blog;
}

export default async function BlogPage({
	params,
}: {
	params: { slug: string };
}) {
	console.log("Page params:", params);
	const slug = params.slug;
	if (!slug) {
		notFound();
	}
	const blog = await getBlogPost(slug);

	return (
		<main className="container mx-auto px-4 py-8">
			<article className="max-w-4xl mx-auto">
				{blog.image && (
					<div className="relative w-full h-[400px] mb-8">
						<Image
							src={blog.image}
							alt={blog.imageAlt || blog.title}
							fill
							className="object-cover rounded-lg"
							priority
						/>
					</div>
				)}
				<h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
				<div className="flex items-center gap-4 text-gray-600 mb-6">
					<span>By {blog.author}</span>
					<span>•</span>
					<time dateTime={blog.publishedAt}>
						{new Date(blog.publishedAt).toLocaleDateString()}
					</time>
				</div>
				{blog.tags && blog.tags.length > 0 && (
					<div className="flex gap-2 mb-8">
						{blog.tags.map((tag) => (
							<span
								key={tag}
								className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
								{tag}
							</span>
						))}
					</div>
				)}
				<div className="prose prose-lg max-w-none">
					<PortableText value={blog.content} />
				</div>
			</article>
		</main>
	);
}
