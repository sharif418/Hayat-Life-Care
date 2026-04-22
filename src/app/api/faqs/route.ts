import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/faqs - Get all active FAQs sorted by order
export async function GET() {
  try {
    const faqs = await db.fAQ.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ data: faqs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

// POST /api/faqs - Create a new FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer, category, order, active } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    const faq = await db.fAQ.create({
      data: {
        question,
        answer,
        category: category || 'general',
        order: order ?? 0,
        active: active ?? true,
      },
    });

    return NextResponse.json(
      { success: true, data: faq },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}
