import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

interface BlogCardProps {
	id: number;
	title: string;
	summary: string;
	image: string;
	date: string;
	author: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
	id,
	title,
	summary,
	image,
	date,
	author,
}) => {
	return (
		<div className="bg-gray-900 rounded-xl overflow-hidden border border-[#B9FB4B]/20 shadow-lg hover:shadow-xl transition-all duration-300">
			<div className="relative h-48 w-full">
				<Image
					src={image}
					alt={title}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
			</div>
			<div className="p-6">
				<h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 hover:text-[#B9FB4B] transition-colors">
					{title}
				</h3>
				<p className="text-white/80 mb-4 line-clamp-3 text-sm">
					{summary}
				</p>
				<div className="flex items-center justify-between text-sm text-white/60 mb-4">
					<div className="flex items-center gap-2">
						<User size={16} className="text-[#B9FB4B]" />
						<span>{author}</span>
					</div>
					<div className="flex items-center gap-2">
						<Calendar size={16} className="text-[#B9FB4B]" />
						<span>{new Date(date).toLocaleDateString()}</span>
					</div>
				</div>
				<Link
					href={`/blogs/${id}`}
					className="inline-flex w-full items-center justify-center bg-[#B9FB4B] hover:bg-[#86B82D] text-[#1A2F06] px-6 py-2.5 rounded-lg transition-colors duration-300 text-sm font-medium">
					Read More
				</Link>
			</div>
		</div>
	);
};

export default BlogCard;
