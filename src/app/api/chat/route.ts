import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Complete FAQ knowledge base
const FAQ_DATABASE = [
  { q: 'What is Hayat Life Care?', keywords: ['what is', 'hayat life care', 'about', 'tell me about', 'company', 'কি', 'সম্পর্কে'], a: 'Hayat Life Care is a premium healthcare and lifestyle complex in Chattogram, Bangladesh — a one-stop destination for healthcare services, daily essentials, dining, and entertainment under one roof. It is a sister concern of Hayat Holdings.' },
  { q: 'Where is it located?', keywords: ['where', 'location', 'address', 'situated', 'কোথায়', 'ঠিকানা'], a: 'Hayat Life Care is located at Manashi, O.R. Nizam Road, Chattogram — one of the most trusted healthcare zones in the city, near Chittagong Medical College Hospital.' },
  { q: 'What is the land area and structure?', keywords: ['land', 'area', 'structure', 'katha', 'floors', 'levels', 'building', 'size', 'জমি', 'তলা'], a: 'The complex spans 55 Katha of land with 9 levels plus 3 basements. Future plans include expansion to 14-18 floors.' },
  { q: 'Why invest in Hayat Life Care?', keywords: ['why invest', 'investment', 'invest', 'reason', 'benefit of investing', 'কেন বিনিয়োগ'], a: 'Hayat Life Care offers a unique investment opportunity in Chattogram\'s healthcare sector. With 11 business wings, a prime location, and no bank loans, your investment is secure with transparent profit distribution and a buyback guarantee after 3 years at 5% higher price.' },
  { q: 'Will there be a hospital?', keywords: ['hospital', 'medical', 'healthcare facility', 'হাসপাতাল'], a: 'Yes, future expansion plans include a specialized hospital focusing on Cancer, Heart, Kidney, and Gyne & Obs departments — making it a comprehensive healthcare destination.' },
  { q: 'Who will operate the company?', keywords: ['who', 'operate', 'management', 'leader', 'chairman', 'director', 'founder', 'কে পরিচালনা'], a: 'The company is operated under the leadership of Chairman Capt. Md Showkat Hossain Chowdhury and Managing Director Dr. Mohammad Azizul Haque, both highly experienced professionals in their respective fields.' },
  { q: 'How will profit be distributed?', keywords: ['profit', 'distribution', 'dividend', 'return', 'earning', 'মুনাফা', 'লাভ'], a: 'Profit will be distributed transparently among shareholders based on the benefit codes (B-1 to B-8). Financial statements will be audited and shared regularly with all investors.' },
  { q: 'What are the profit expectations?', keywords: ['profit expect', 'how much profit', 'return on investment', 'roi', 'expected return'], a: 'Profit expectations are based on the revenue generated from all 11 business wings. As the complex becomes fully operational, returns are expected to grow significantly. Detailed projections are available upon request.' },
  { q: 'How is transparency ensured?', keywords: ['transparency', 'transparent', 'audit', 'reporting', 'স্বচ্ছতা'], a: 'Transparency is maintained through regular audits, open financial reporting, shareholder meetings, and an administrative office on Level 9 for direct investor engagement.' },
  { q: 'Is there a buyback policy?', keywords: ['buyback', 'buy back', 'exit', 'sell back', 'return policy', 'ফেরত'], a: 'Yes! After 3 years, shares can be bought back at 5% higher than the purchase price, providing a guaranteed exit option for investors.' },
  { q: 'How to book a space?', keywords: ['book', 'appointment', 'contact', 'visit', 'বুকিং', 'যোগাযোগ'], a: 'You can book a space by contacting our office at 01335-074940 or 01335-074941, or by visiting our office at Mishmak Manjuri, Badshah Miah Road, Ameerbag, Chattogram.' },
  { q: 'What documents are required from the shareholder?', keywords: ['document required', 'documents needed', 'shareholder document', 'what documents', 'কাগজপত্র দরকার'], a: 'Required documents: (1) National ID card (photocopy), (2) Nominee national ID card (photocopy), (3) 2 passport-size photographs, (4) Completed application form with TK 10,000 application fee. Our team will guide you through the entire process.' },
  { q: 'What documents are provided by Hayat Life Care?', keywords: ['documents provided', 'what will i get', 'certificate', 'কি কাগজ পাবো'], a: 'You will receive: (1) Share certificate, (2) Share transfer form, (3) Receipt of payment, (4) Memorandum of Understanding, (5) Company registration documents. All documents are legally binding and government-recognized.' },
  { q: 'What is the expected handover date?', keywords: ['handover', 'completion', 'when ready', 'delivery', 'launch date', 'কবে হস্তান্তর'], a: 'The commercial operations are targeted to begin by December 2028. Construction is progressing on schedule. Shareholders will be notified with regular updates.' },
  { q: 'Will any bank loan be taken?', keywords: ['bank loan', 'loan', 'debt', 'borrow', 'ব্যাংক লোন', 'ঋণ'], a: 'No. Hayat Life Care will not take any bank loan. The project is entirely funded by shareholder investments, ensuring no debt burden on the company.' },
  { q: 'What is the maximum number of shares?', keywords: ['maximum shares', 'total shares', 'how many shares', 'share count', 'কতগুলো শেয়ার'], a: 'A total of 4,950 shares are available, each priced at 10 Lacs BDT. This limited number ensures exclusivity and higher per-share value.' },
  { q: 'Can I sell my shares/directorship?', keywords: ['sell share', 'transfer', 'sell directorship', 'বিক্রি', 'হস্তান্তর'], a: 'Yes, shareholders can sell their shares with prior written approval from Hayat Life Care management. A royalty fee of 10% of profit is payable to Hayat Life Care before transaction completion. Original investment amount plus 90% of profit goes to the seller.' },
  { q: 'What is the share structure?', keywords: ['share structure', 'share price', 'price', 'phase', 'cost', 'কত টাকা', 'দাম', 'মূল্য', 'শেয়ার'], a: '1st Phase: 2,500 shares at 10 Lacs each = 250 Crores. 2nd Phase: 500 shares at 15 Lacs each = 75 Crores. 3rd Phase: 1,000 shares at 20 Lacs each = 200 Crores. Total shares will not exceed 4,950.' },
  { q: 'What services are available?', keywords: ['service', 'wing', 'facility', 'facilities', 'what services', 'সেবা', 'সুবিধা'], a: 'Hayat Life Care has 11 Business Wings: (1) Paid Parking, (2) ATM Booth, (3) Pharmacy, (4) Optical Shop, (5) Super Shop, (6) Coffee Shop, (7) Juice Bar, (8) Restaurant, (9) Kid\'s Amusement Park, (10) Doctor\'s Chambers, (11) Diagnostic Center. Future expansion includes a specialized hospital.' },
  { q: 'What is the payment schedule?', keywords: ['payment', 'installment', 'pay', 'down payment', 'পেমেন্ট', 'কিস্তি'], a: 'Payment Schedule: 50% Down Payment at the time of booking, 25% within 30 days, and the remaining 25% within 60-90 days.' },
];

// Simple keyword-based FAQ matching
function findBestFAQMatch(userMessage: string): string | null {
  const lowerMsg = userMessage.toLowerCase().trim();
  
  let bestMatch: { answer: string; score: number } | null = null;

  for (const faq of FAQ_DATABASE) {
    let score = 0;
    for (const keyword of faq.keywords) {
      if (lowerMsg.includes(keyword.toLowerCase())) {
        score += keyword.length; // Longer keyword matches get higher scores
      }
    }
    // Also check if question words match
    const questionWords = faq.q.toLowerCase().split(' ');
    for (const word of questionWords) {
      if (word.length > 3 && lowerMsg.includes(word)) {
        score += 1;
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { answer: faq.a, score };
    }
  }

  return bestMatch ? bestMatch.answer : null;
}

// Greeting detection
function isGreeting(msg: string): boolean {
  const greetings = ['hello', 'hi', 'hey', 'assalamualaikum', 'salam', 'good morning', 'good afternoon', 'good evening', 'হ্যালো', 'হাই', 'আসসালামু'];
  return greetings.some(g => msg.toLowerCase().includes(g));
}

// POST /api/chat - AI Chat endpoint (FAQ-based)
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

    // Generate reply
    let aiReply: string;

    if (isGreeting(message)) {
      aiReply = "Assalamualaikum! 👋 Welcome to Hayat Life Care. I'm here to help you with information about our healthcare complex, investment opportunities, facilities, and more. How can I assist you today?";
    } else {
      const faqAnswer = findBestFAQMatch(message);
      if (faqAnswer) {
        aiReply = faqAnswer;
      } else {
        aiReply = "Thank you for your question! For detailed information on this topic, please contact our office directly at 📞 01335-074940 or 01335-074941, or visit us at Mishmak Manjuri, Badshah Miah Road, Ameerbag, Chattogram. Our team will be happy to assist you!";
      }
    }

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
