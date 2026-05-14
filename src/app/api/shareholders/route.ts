import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export const maxDuration = 60;

export async function GET() {
  try {
    const images = await db.shareholderImage.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error('Error fetching shareholder images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { photos } = body;

    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Photos array is required' },
        { status: 400 }
      );
    }

    // Get current max order
    const maxOrderImg = await db.shareholderImage.findFirst({
      orderBy: { order: 'desc' },
    });
    let nextOrder = maxOrderImg ? maxOrderImg.order + 1 : 0;

    const createdImages: any[] = [];
    for (const photo of photos) {
      const created = await db.shareholderImage.create({
        data: {
          photo,
          order: nextOrder++,
          active: true,
        },
      });
      createdImages.push(created);
    }

    return NextResponse.json({ success: true, data: createdImages });
  } catch (error) {
    console.error('Error uploading shareholder images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload images' },
      { status: 500 }
    );
  }
}
