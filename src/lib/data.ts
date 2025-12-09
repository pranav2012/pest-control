import fs from 'fs/promises';
import path from 'path';

// Types
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

export type Process = {
    section_title: string;
    steps: Array<{
        title: string;
        description: string;
        icon: string;
    }>;
    side_image: {
        src: string;
        alt: string;
    };
};

export type Blog = {
    _key: string;
    title: string;
    slug: string;
    summary: string;
    image: string;
    imageAlt: string;
    content: any;
    author: string;
    publishedAt: string;
    tags: string[];
};

// Data loading functions
async function loadJsonFile<T>(filename: string): Promise<T> {
    const filePath = path.join(process.cwd(), 'data', filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
}

export async function getServicesData() {
    return loadJsonFile<{ services: Service[] }>('services.json');
}

export async function getBlogsData() {
    return loadJsonFile<Blog[]>('blogs.json');
}

export async function getBlogBySlug(slug: string) {
    const blogs = await getBlogsData();
    return blogs.find(blog => blog.slug === slug) || null;
}

export async function getServiceBySlug(slug: string) {
    const { services } = await getServicesData();
    return services.find(service => service.slug === slug) || null;
} 