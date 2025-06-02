import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
	_key: string;
	title: string;
	slug: string;
	summary: string;
	image: string;
	imageAlt: string;
	author: string;
	publishedAt: string;
	tags: string[];
}

export default function BlogCard({
	title,
	slug,
	summary,
	image,
	imageAlt,
	author,
	publishedAt,
	tags,
}: BlogCardProps) {
	return (
		<Card className="overflow-hidden border-[#B9FB4B]/20 bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
			<div className="relative h-48 w-full">
				<Image
					src={image}
					alt={imageAlt}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					priority={false}
				/>
			</div>
			<CardContent className="p-5">
				<div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
					<div className="flex items-center gap-1">
						<Calendar className="h-4 w-4" />
						<span>
							{new Date(publishedAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</span>
					</div>
					<div className="flex items-center gap-1">
						<User className="h-4 w-4" />
						<span>{author}</span>
					</div>
				</div>
				<h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
					{title}
				</h3>
				<p className="text-gray-400 line-clamp-3 mb-4">{summary}</p>
				{tags && tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-4">
						{tags.map((tag) => (
							<span
								key={tag}
								className="px-2 py-1 text-xs bg-[#B9FB4B]/10 text-[#B9FB4B] rounded-full">
								{tag}
							</span>
						))}
					</div>
				)}
			</CardContent>
			<CardFooter className="p-5 pt-0">
				<Link href={`/blogs/${slug}`} className="w-full">
					<Button
						variant="outline"
						className="w-full border-[#B9FB4B] text-[#B9FB4B] hover:bg-[#B9FB4B]/10">
						Read more
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
