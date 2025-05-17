import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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

async function getBlogPost(id: string) {
  const filePath = path.join(process.cwd(), 'public/data/blogs.json');
  const fileContents = await fs.promises.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  const blog = data.blogs.find((b: BlogPost) => b.id === parseInt(id));
  
  if (!blog) {
    notFound();
  }
  
  return blog;
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const blog = await getBlogPost(params.id);

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="relative h-[400px] w-full mb-8">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{blog.author}</span>
          <span>•</span>
          <span>{new Date(blog.date).toLocaleDateString()}</span>
        </div>

        {blog.content.map((section, index) => {
          if (section.type === 'subheading') {
            return (
              <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
                {section.text}
              </h2>
            );
          }
          return (
            <p key={index} className="mb-6">
              {section.text}
            </p>
          );
        })}
      </div>
    </article>
  );
} 