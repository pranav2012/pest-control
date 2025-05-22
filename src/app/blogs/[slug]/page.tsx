import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.config";
import { blogBySlugQuery } from "@/lib/queries/blogs";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity.config";

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

const components: Partial<PortableTextReactComponents> = {
	block: {
		h1: ({ children }) => (
			<h1 className="text-4xl font-bold text-white mt-8 mb-4">
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-3xl font-semibold text-[#B9FB4B] mt-8 mb-4">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-2xl font-semibold text-white mt-6 mb-3">
				{children}
			</h3>
		),
		h4: ({ children }) => (
			<h4 className="text-xl font-semibold text-white mt-6 mb-3">
				{children}
			</h4>
		),
		normal: ({ children }) => (
			<p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
		),
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-[#B9FB4B] pl-4 italic text-gray-300 my-6">
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">
				{children}
			</ol>
		),
	},
	marks: {
		strong: ({ children }) => (
			<strong className="font-bold text-white">{children}</strong>
		),
		em: ({ children }) => (
			<em className="italic text-gray-300">{children}</em>
		),
		code: ({ children }) => (
			<code className="bg-gray-800 rounded px-1 py-0.5 text-[#B9FB4B]">
				{children}
			</code>
		),
		link: ({ children, value }) => (
			<a
				href={value?.href}
				className="text-[#B9FB4B] hover:underline"
				target="_blank"
				rel="noopener noreferrer">
				{children}
			</a>
		),
	},
	types: {
		inlineImage: ({ value }) => {
			if (!value?.asset?._ref) {
				return null;
			}
			return (
				<figure className="my-8">
					<div className="relative w-full h-[400px] rounded-lg overflow-hidden">
						<Image
							src={urlFor(value).url()}
							alt={value.alt || ""}
							fill
							className="object-cover"
						/>
					</div>
					{value.caption && (
						<figcaption className="text-center text-gray-400 mt-2 text-sm">
							{value.caption}
						</figcaption>
					)}
				</figure>
			);
		},
	},
};

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
						<PortableText
							value={blog.content}
							components={components}
						/>
					</div>
				</div>
			</div>
			<div className="h-32 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
		</article>
	);
}
