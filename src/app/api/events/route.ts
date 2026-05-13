import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const events = await db.event.findMany({
      where: { active: true },
      include: { photos: { orderBy: { order: 'asc' } } },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, coverPhoto, photos } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Event name is required' },
        { status: 400 }
      );
    }

    const event = await db.event.create({
      data: {
        name,
        description: description || '',
        coverPhoto: coverPhoto || null,
        active: true,
        photos: photos?.length
          ? {
              create: photos.map((p: { photo: string; caption?: string }, i: number) => ({
                photo: p.photo,
                caption: p.caption || null,
                order: i,
              })),
            }
          : undefined,
      },
      include: { photos: true },
    });

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
