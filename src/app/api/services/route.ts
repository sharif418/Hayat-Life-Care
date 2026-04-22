import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/services - Get all active services sorted by order
export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, icon, image, floor, category, order, active } = body;

    if (!title || !slug || !description) {
      return NextResponse.json(
        { error: 'Title, slug, and description are required' },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existing = await db.service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'A service with this slug already exists' },
        { status: 409 }
      );
    }

    const service = await db.service.create({
      data: {
        title,
        slug,
        description,
        icon: icon || null,
        image: image || null,
        floor: floor || null,
        category: category || null,
        order: order ?? 0,
        active: active ?? true,
      },
    });

    return NextResponse.json(
      { success: true, data: service },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
