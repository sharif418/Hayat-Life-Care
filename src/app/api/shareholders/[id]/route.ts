import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Shareholder image ID is required' },
        { status: 400 }
      );
    }

    await db.shareholderImage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting shareholder image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete shareholder image' },
      { status: 500 }
    );
  }
}
