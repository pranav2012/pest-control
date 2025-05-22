import { groq } from 'next-sanity'

export const blogsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
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
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
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