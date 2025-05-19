import fs from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPost {
	id: number;
	title: string;
	image: string;
	content: Array<{
		type: string;
		text: string;
	}>;
	date: string;
	author: string;
}

interface ContentSection {
	type: string;
	text: string;
}

async function getBlogPost(id: string) {
	const filePath = path.join(process.cwd(), "public/data/blogs.json");
	const fileContents = await fs.promises.readFile(filePath, "utf8");
	const data = JSON.parse(fileContents);
	const blog = data.blogs.find((b: BlogPost) => b.id === parseInt(id));

	if (!blog) {
		notFound();
	}

	return blog;
}

async function createBlogPage(params: { id: string }) {
	const blog = await getBlogPost(params.id);

	return (
		<article className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/95 text-white border-b border-gray-800">
			<div className="container mx-auto px-4 py-12 max-w-4xl">
				<div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
					<Image
						src={blog.image}
						alt={blog.title}
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
				</div>

				<div className="prose prose-lg max-w-none prose-invert">
					<h1 className="text-4xl font-bold mb-4 text-white">
						{blog.title}
					</h1>

					<div className="flex items-center gap-4 text-gray-400 mb-8">
						<span>{blog.author}</span>
						<span className="text-[#B9FB4B]">•</span>
						<span>{new Date(blog.date).toLocaleDateString()}</span>
					</div>

					{blog.content.map(
						(section: ContentSection, index: number) => {
							if (section.type === "subheading") {
								return (
									<h2
										key={index}
										className="text-2xl font-semibold mt-8 mb-4 text-[#B9FB4B]">
										{section.text}
									</h2>
								);
							}
							return (
								<p key={index} className="mb-6 text-gray-300">
									{section.text}
								</p>
							);
						}
					)}
				</div>
			</div>
			<div className="h-32 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
		</article>
	);
}

export default async function Page(props: any) {
	return createBlogPage(props.params);
}
