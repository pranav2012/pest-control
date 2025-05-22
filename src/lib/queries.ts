import { fetchWithCache } from './cache';

// Define types for better type safety
export type Service = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  details: {
    warranty?: string;
    service_area?: string;
    pests_covered?: string[];
    pest_facts?: Array<{
      title: string;
      content: string;
    }>;
    treatment_process: string[];
    treatment_details?: Array<{
      title: string;
      description: string;
      image?: {
        src: string;
        alt: string;
      };
    }>;
    maintenance_contracts?: Array<{
      title: string;
      description: string;
    }>;
    service_features: string[];
    pricing?: Array<{
      type: string;
      price: string;
    }>;
  };
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

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "image": {
    "src": image.asset->url,
    "alt": image.alt
  },
  details
}`;

export async function getServices(): Promise<Service[]> {
  return fetchWithCache<Service[]>(servicesQuery);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchWithCache<Testimonial[]>(
    `*[_type == "testimonial"] {
      _id,
      name,
      testimonial,
      rating,
      "image": image.asset->url,
      service->
    }`
  );
}

export async function getPage(slug: string): Promise<Page | null> {
  return fetchWithCache<Page | null>(
    `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      content,
      seo
    }`,
    { slug }
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "image": {
      "src": image.asset->url,
      "alt": image.alt
    },
    details
  }`;
  return fetchWithCache<Service | null>(query, { slug });
} 