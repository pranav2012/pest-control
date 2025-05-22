import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Map of content types to their corresponding paths
const CONTENT_TYPE_PATHS: Record<string, string[]> = {
  blog: ['/blogs', '/'], // Blog posts appear on both blogs page and homepage
  service: ['/services', '/'], // Services appear on both services page and homepage
  process: ['/'], // Process section appears on homepage
  testimonial: ['/'], // Testimonials appear on homepage
  page: ['/'], // Regular pages appear on homepage
  // Add more content types and their paths as needed
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { _type, slug } = body;

    // Verify the request is from Sanity
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token !== process.env.SANITY_REVALIDATE_TOKEN) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get paths to revalidate for this content type
    const pathsToRevalidate = CONTENT_TYPE_PATHS[_type] || [];

    // Revalidate all relevant paths
    pathsToRevalidate.forEach(path => {
      revalidatePath(path);
    });

    // If the document has a slug, also revalidate its specific page
    if (slug?.current) {
      const specificPath = `/${_type === 'page' ? '' : _type + 's/'}${slug.current}`;
      revalidatePath(specificPath);
    }

    return NextResponse.json({
      revalidated: true,
      message: `Successfully revalidated paths for ${_type}`,
      paths: pathsToRevalidate
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({
      revalidated: false,
      message: 'Error revalidating'
    }, { status: 500 });
  }
} 