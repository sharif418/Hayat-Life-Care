import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/videos — List all active videos (public) or all videos (admin)
export async function GET(request: NextRequest) {
  try {
    const isAdmin = request.headers.get('x-admin-auth') === 'true';

    const videos = await db.video.findMany({
      where: isAdmin ? {} : { active: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

// POST /api/videos — Create a new video (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, youtubeId, thumbnail, order, active } = body;

    if (!title || !youtubeId) {
      return NextResponse.json(
        { error: 'Title and youtubeId are required' },
        { status: 400 }
      );
    }

    const video = await db.video.create({
      data: {
        title,
        description: description || '',
        youtubeId,
        thumbnail: thumbnail || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
        order: order || 0,
        active: active !== false,
      },
    });

    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}
