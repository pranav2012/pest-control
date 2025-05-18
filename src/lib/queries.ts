import { getCachedData } from './cache';

// Define types for better type safety
export type Service = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  price: number;
  image: string;
  features: string[];
};

export type Testimonial = {
  _id: string;
  name: string;
  testimonial: string;
  rating: number;
  image: string;
  service: Service;
};

export type Page = {
  _id: string;
  title: string;
  content: any[];
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};

export async function getServices() {
  return getCachedData<Service[]>(
    `*[_type == "service"] {
      _id,
      title,
      "slug": slug.current,
      description,
      price,
      "image": image.asset->url,
      features
    }`,
    undefined,
    { next: { revalidate: false } }
  );
}

export async function getTestimonials() {
  return getCachedData<Testimonial[]>(
    `*[_type == "testimonial"] {
      _id,
      name,
      testimonial,
      rating,
      "image": image.asset->url,
      service->
    }`,
    undefined,
    { next: { revalidate: false } }
  );
}

export async function getPage(slug: string) {
  return getCachedData<Page>(
    `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      content,
      seo
    }`,
    { slug },
    { next: { revalidate: false } }
  );
}

export async function getServiceBySlug(slug: string) {
  return getCachedData<Service>(
    `*[_type == "service" && slug.current == $slug][0] {
      _id,
      title,
      description,
      price,
      "image": image.asset->url,
      features
    }`,
    { slug },
    { next: { revalidate: false } }
  );
} 