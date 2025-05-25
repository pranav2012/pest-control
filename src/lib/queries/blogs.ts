import { groq } from 'next-sanity'
import { client } from '../sanity.config';

export interface Blog {
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

export const blogsQuery = groq`
  *[_type == "blogs"][0].blogs[] | order(publishedAt desc) {
    _key,
    title,
    "slug": slug.current,
    summary,
    "image": image.asset->url,
    "imageAlt": image.alt,
    author,
    publishedAt,
    tags
  }
`

export const blogBySlugQuery = groq`
  *[_type == "blogs"][0].blogs[slug.current == $slug][0] {
    _key,
    title,
    "slug": slug.current,
    summary,
    "image": image.asset->url,
    "imageAlt": image.alt,
    content,
    author,
    publishedAt,
    tags
  }
`

export async function getBlogPost(slug: string): Promise<Blog | null> {
  const blog = await client.fetch<Blog>(blogBySlugQuery, { slug });
  if (!blog) {
    return null;
  }
  return blog;
} 