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
		<article className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/95 text-white border-b border-gray-800">
			<div className="container mx-auto px-4 py-12 max-w-4xl">
				{blog.image && (
					<div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
						<Image
							src={blog.image}
							alt={blog.imageAlt || blog.title}
							fill
							className="object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
					</div>
				)}

				<div className="prose prose-lg max-w-none prose-invert">
					<h1 className="text-4xl font-bold mb-4 text-white">
						{blog.title}
					</h1>

					<div className="flex items-center gap-4 text-gray-400 mb-8">
						<span>By {blog.author}</span>
						<span className="text-[#B9FB4B]">•</span>
						<time dateTime={blog.publishedAt}>
							{new Date(blog.publishedAt).toLocaleDateString()}
						</time>
					</div>

					{blog.tags && blog.tags.length > 0 && (
						<div className="flex gap-2 mb-8">
							{blog.tags.map((tag) => (
								<span
									key={tag}
									className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
									{tag}
								</span>
							))}
						</div>
					)}

					<div className="prose prose-lg max-w-none prose-invert">
						<PortableText value={blog.content} />
					</div>
				</div>
			</div>
			<div className="h-32 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
		</article>
	);
}
