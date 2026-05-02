import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/testimonials - Get testimonials
// ?all=true returns all (including inactive) for admin
export async function GET(req: NextRequest) {
  try {
    const showAll = req.nextUrl.searchParams.get('all') === 'true';
    const testimonials = await db.testimonial.findMany({
      where: showAll ? {} : { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ data: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// POST /api/testimonials - Create a new testimonial
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, designation, text, photo, rating, order, active } = body;

    if (!name || !designation || !text) {
      return NextResponse.json({ error: 'Name, designation, and text are required' }, { status: 400 });
    }

    const testimonial = await db.testimonial.create({
      data: {
        name,
        designation,
        text,
        photo: photo || null,
        rating: rating || 5,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json({ data: testimonial }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
