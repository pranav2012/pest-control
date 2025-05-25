import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, type Blog, blogsQuery } from "@/lib/queries/blogs";
import {
	PortableText,
	PortableTextReactComponents,
	PortableTextComponentProps,
} from "@portabletext/react";
import { urlFor } from "@/lib/sanity.config";
import { client } from "@/lib/sanity.config";

interface Blog {
	_key: string;
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
		h1: ({ children }: PortableTextComponentProps<any>) => (
			<h1 className="text-4xl font-bold mb-4">{children}</h1>
		),
		h2: ({ children }: PortableTextComponentProps<any>) => (
			<h2 className="text-3xl font-bold mb-3">{children}</h2>
		),
		h3: ({ children }: PortableTextComponentProps<any>) => (
			<h3 className="text-2xl font-bold mb-2">{children}</h3>
		),
		h4: ({ children }: PortableTextComponentProps<any>) => (
			<h4 className="text-xl font-bold mb-2">{children}</h4>
		),
		normal: ({ children }: PortableTextComponentProps<any>) => (
			<p className="mb-4">{children}</p>
		),
		blockquote: ({ children }: PortableTextComponentProps<any>) => (
			<blockquote className="border-l-4 border-[#B9FB4B] pl-4 italic my-4">
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }: PortableTextComponentProps<any>) => (
			<ul className="list-disc list-inside mb-4">{children}</ul>
		),
		number: ({ children }: PortableTextComponentProps<any>) => (
			<ol className="list-decimal list-inside mb-4">{children}</ol>
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

// Generate static params for all blog posts
export async function generateStaticParams() {
	const blogs = await client.fetch<Blog[]>(blogsQuery);
	return blogs.map((blog) => ({
		slug: blog.slug,
	}));
}

// Enable ISR with on-demand revalidation
export const dynamic = "force-static";
export const revalidate = false;

export default async function BlogPage({ params }: any) {
	const blog = await getBlogPost(params.slug);
	if (!blog) {
		notFound();
	}

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
							{blog.tags.map((tag: string) => (
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
