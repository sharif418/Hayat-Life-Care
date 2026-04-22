import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/leaders - Get all leaders sorted by order
export async function GET() {
  try {
    const leaders = await db.leader.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ data: leaders });
  } catch (error) {
    console.error('Error fetching leaders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaders' },
      { status: 500 }
    );
  }
}
