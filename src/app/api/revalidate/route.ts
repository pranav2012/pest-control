import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, slug } = body;

    // Verify the request is from Sanity
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token !== process.env.SANITY_REVALIDATE_TOKEN) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Revalidate based on the document type
    switch (type) {
      case 'service':
        revalidatePath('/services');
        if (slug) {
          revalidatePath(`/services/${slug}`);
        }
        break;
      case 'testimonial':
        revalidatePath('/');
        break;
      case 'page':
        if (slug) {
          revalidatePath(`/${slug}`);
        }
        break;
      case 'blog':
        revalidatePath('/blogs');
        if (slug) {
          revalidatePath(`/blogs/${slug}`);
        }
        break;
      default:
        return NextResponse.json(
          { message: 'Invalid document type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
} 