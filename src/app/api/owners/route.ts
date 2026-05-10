import { NextResponse } from 'next/server';
import { db } from '@/lib/db';



export async function GET() {
  try {
    const owners = await db.owner.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: owners });
  } catch (error) {
    console.error('Error fetching owners:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch owners', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, identity, image, active } = body;

    if (!name || !identity) {
      return NextResponse.json(
        { success: false, error: 'Name and identity are required' },
        { status: 400 }
      );
    }

    const owner = await db.owner.create({
      data: {
        name,
        identity,
        image: image || null,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json({ success: true, data: owner });
  } catch (error) {
    console.error('Error creating owner:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create owner', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
