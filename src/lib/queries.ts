import { fetchWithCache } from './cache';

// Define types for better type safety
export type Service = {
  _id: string;
  _key: string;
  title: string;
  slug: string;
  date?: string;
  about_service?: Array<{
    _key: string;
    _type: string;
    style: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
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
      price?: string;
      features?: string[];
    }>;
    service_features: string[];
    pricing?: Array<{
      _key: string;
      type: string;
      price: string;
      includes?: string[];
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

export const servicesQuery = `*[_type == "services"][0].services[] {
  _key,
  title,
  "slug": slug.current,
  date,
  about_service,
  description,
  "image": {
    "src": image.src,
    "alt": image.alt
  },
  details
}`;

export const navigationServicesQuery = `*[_type == "services"][0].services[] {
  title,
  "slug": slug.current
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
  const query = `*[_type == "services"][0].services[slug.current == $slug][0] {
    _key,
    title,
    "slug": slug.current,
    date,
    about_service[] {
      ...,
      _type == "image" => {
        ...,
        "src": {
          "asset": asset->
        }
      }
    },
    description,
    "image": {
      "src": image.src.asset->url,
      "alt": image.alt
    },
    details {
      pests_covered,
      service_features,
      treatment_process,
      warranty,
      pricing[] {
        _key,
        type,
        price,
        includes
      },
      treatment_details[] {
        title,
        description,
        image {
          "src": asset->url,
          alt
        }
      },
      maintenance_contracts[] {
        title,
        description,
        price,
        features
      }
    }
  }`;
  return fetchWithCache<Service | null>(query, { slug });
}

export async function getNavigationServices(): Promise<Array<{ title: string; slug: string }>> {
  return fetchWithCache<Array<{ title: string; slug: string }>>(navigationServicesQuery);
} 