import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity
    const token = request.headers.get('authorization')?.split(' ')[1];
    console.log('Received token:', token ? 'Present' : 'Missing');

    if (token !== process.env.SANITY_REVALIDATE_TOKEN) {
      console.log('Token mismatch. Expected:', process.env.SANITY_REVALIDATE_TOKEN ? 'Present' : 'Missing');
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Revalidate all pages
    revalidatePath('/');
    revalidatePath('/blogs');
    revalidatePath('/services');
    revalidatePath('/payment');

    return NextResponse.json({
      revalidated: true,
      message: 'Successfully revalidated all pages'
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({
      revalidated: false,
      message: 'Error revalidating'
    }, { status: 500 });
  }
} 