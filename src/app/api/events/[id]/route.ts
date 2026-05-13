import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const event = await db.event.findUnique({
      where: { id },
      include: { photos: { orderBy: { order: 'asc' } } },
    });
    if (!event) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, description, coverPhoto, active, addPhotos, removePhotoIds } = body;

    // Update event
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (coverPhoto !== undefined) updateData.coverPhoto = coverPhoto;
    if (active !== undefined) updateData.active = active;

    const event = await db.event.update({
      where: { id },
      data: updateData,
    });

    // Add new photos
    if (addPhotos?.length) {
      const existingCount = await db.eventPhoto.count({ where: { eventId: id } });
      await db.eventPhoto.createMany({
        data: addPhotos.map((p: { photo: string; caption?: string }, i: number) => ({
          eventId: id,
          photo: p.photo,
          caption: p.caption || null,
          order: existingCount + i,
        })),
      });
    }

    // Remove photos
    if (removePhotoIds?.length) {
      await db.eventPhoto.deleteMany({
        where: { id: { in: removePhotoIds } },
      });
    }

    const updated = await db.event.findUnique({
      where: { id },
      include: { photos: { orderBy: { order: 'asc' } } },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ success: false, error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.event.delete({ where: { id } }); // Cascade deletes photos
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete event' }, { status: 500 });
  }
}
