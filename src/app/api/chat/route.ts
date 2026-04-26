import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import ZAI from 'z-ai-web-dev-sdk';

const SYSTEM_PROMPT = `You are a helpful assistant for Hayat Life Care, a one-stop healthcare & lifestyle destination in Chattogram, Bangladesh. 

Key facts about Hayat Life Care:
- It is a sister concern of Hayat Holdings
- Located on O.R. Nizam Road, Chattogram (Near Chittagong Medical College Hospital)
- Built on 55 Katha of land, 9+ levels with 3 basements
- 11 Business Wings: Parking, ATM Booth, Pharmacy, Optical Shop, Super Shop, Coffee Shop, Juice Bar, Restaurant, Kid's Amusement Park, Doctor's Chambers, Diagnostic Center
- Future plan: Specialized Hospital (Cancer, Heart, Kidney, Gyne & Obs)
- Leadership: Chairman - Capt. Md Showkat Hossain Chowdhury, MD - Dr. Mohammad Azizul Haque
- Investment shares at 10 Lacs/share with various benefit codes (B-1 to B-8)
- Contact: 01335-074940, 01335-074941
- Office: Probortok Circle, Badshah Miah Road, Ameerbag, Chattogram

Answer questions about the healthcare complex, services, investment opportunities, and general information. Be friendly and professional. If you don't know the answer, suggest the user contact the office directly.`;

// POST /api/chat - AI Chat endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    // Save user message
    await db.chatMessage.create({
      data: {
        sessionId,
        role: 'user',
        content: message,
      },
    });

    // Get recent chat history for context (last 20 messages)
    const chatHistory = await db.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 20,
    });

    // Build messages array for the AI
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...chatHistory.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    // Call z-ai-web-dev-sdk
    const zai = await ZAI.create();
    const response = await zai.chat.completions.create({
      messages,
      stream: false,
    });

    // Extract assistant reply
    const aiReply =
      response?.choices?.[0]?.message?.content ||
      'I apologize, but I was unable to generate a response. Please try again.';

    // Save assistant message
    await db.chatMessage.create({
      data: {
        sessionId,
        role: 'assistant',
        content: aiReply,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        reply: aiReply,
        sessionId,
      },
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
