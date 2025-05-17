import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

interface BlogCardProps {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  author: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, summary, image, date, author }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#075e54]/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#075e54] mb-3 line-clamp-2 hover:text-[#25D366] transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
          {summary}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <User size={16} className="text-[#075e54]" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#075e54]" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>
        <Link 
          href={`/blogs/${id}`}
          className="inline-flex w-full items-center justify-center bg-[#075e54] text-white px-6 py-2.5 rounded-lg hover:bg-[#25D366] transition-colors duration-300 text-sm font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard; 