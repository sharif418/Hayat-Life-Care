import { NextResponse } from 'next/server';
import { db } from '@/lib/db';



export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    const { active, name, identity, image, order } = body;

    const updateData: any = {};
    if (active !== undefined) updateData.active = active;
    if (name !== undefined) updateData.name = name;
    if (identity !== undefined) updateData.identity = identity;
    if (image !== undefined) updateData.image = image;
    if (order !== undefined) updateData.order = order;

    const owner = await db.owner.update({
      where: { id: resolvedParams.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: owner });
  } catch (error) {
    console.error('Failed to update owner:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update owner' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await db.owner.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete owner:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete owner' },
      { status: 500 }
    );
  }
}
