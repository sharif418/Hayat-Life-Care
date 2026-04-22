import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST /api/inquiries - Submit inquiry from contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone, and message are required fields' },
        { status: 400 }
      );
    }

    const inquiry = await db.inquiry.create({
      data: {
        name,
        email: email || null,
        phone,
        subject: subject || null,
        message,
        status: 'new',
      },
    });

    return NextResponse.json(
      { success: true, data: inquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

// GET /api/inquiries - List all inquiries (admin)
export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}
