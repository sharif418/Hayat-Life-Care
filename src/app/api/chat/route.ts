import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Fallback FAQ knowledge base (used when database has no FAQs)
const FALLBACK_FAQ_DATABASE = [
  { q: 'What is Hayat Life Care?', keywords: ['what is', 'hayat life care', 'about', 'tell me about', 'company', 'কি', 'সম্পর্কে'], a: 'Hayat Life Care is a one-stop lifestyle destination set to become the largest diagnostic and specialized hospital center in Chattogram. It is going to be the first cancer diagnostic center and the first specialized hospital in the city. It offers a combination of healthcare, daily essentials, wellness, and leisure facilities — all under one roof.' },
  { q: 'Is it a registered company?', keywords: ['registered', 'rjsc', 'joint stock', 'নিবন্ধিত'], a: 'Yes, Hayat Life Care is a registered company with RJSC (Registrar of Joint Stock Companies and Firms).' },
  { q: 'Where is it located?', keywords: ['where', 'location', 'address', 'situated', 'কোথায়', 'ঠিকানা'], a: 'Corner plot of O.R. Nizam Road & Badsha Mia Road (War Cemetery Road), Chattogram. West of Chattogram Medical College and Hospital (CMCH).' },
  { q: 'What is the land area and structure?', keywords: ['land', 'area', 'structure', 'katha', 'floors', 'levels', 'building', 'size', 'জমি', 'তলা'], a: 'Land Area: 55 Katha with 150+ paid parking spaces across 3 basements. Approximately 19,000 sft per floor, totaling around 266,000 sft up to the 14th level.' },
  { q: 'Are you the owner of the full building?', keywords: ['owner', 'full building', 'sole owner', 'মালিক'], a: 'Yes, Hayat Life Care will be the sole owner of the land, building, and all business wings. The entire structure and all businesses will be managed under a single management.' },
  { q: 'What is the floor-wise plan?', keywords: ['floor', 'plan', 'level', 'basement', 'ফ্লোর', 'তলা'], a: 'Basement: 3 basements with 150+ parking spaces | Level 1: Reception, Super Shop, Pharmacy, Optical Shop, Coffee Shop & ATM Booth | Level 2: Restaurant, Juice Bar & Amusement Park | Level 3: Common Diagnostic Floor (Pathology, MRI, ECG, USG, X-Ray) | Level 4: Designated Female Diagnostic Floor | Level 5-8: Doctor\'s Chambers, Cancer Institute, Fertility Institute, Ophthalmology, Dental | Level 9: Mosque (Male & Female) & Office | Above Level 9: Specialized Hospital (Cancer, Heart, Kidney, Gynecology & Obstetrics)' },
  { q: 'What is the expected handover/operation date?', keywords: ['handover', 'completion', 'when ready', 'delivery', 'launch date', 'কবে হস্তান্তর', 'operation date'], a: 'Revenue generation: December 2028 (+9 months) | Diagnostic operations start: June 2029 (+9 months) | Full diagnostic operations: December 2029 (+9 months) | Hospital operations: March 2030 (+9 months)' },
  { q: 'Why invest in Hayat Life Care?', keywords: ['why invest', 'investment', 'invest', 'reason', 'benefit of investing', 'কেন বিনিয়োগ'], a: 'Largest diagnostic and consultation center in Chattogram. First Cancer diagnostic center and first Specialized Hospital in the city. Unique concept combining healthcare and lifestyle. 150+ car parking spaces. Prime location with high visibility. 11 business wings under one roof with single management.' },
  { q: 'Will there be a hospital?', keywords: ['hospital', 'medical', 'healthcare facility', 'হাসপাতাল'], a: 'Yes, a specialized hospital is planned above Level 9, subject to approval from relevant authorities. Construction will be completed in a single phase.' },
  { q: 'Who will operate the company?', keywords: ['who', 'operate', 'management', 'leader', 'কে পরিচালনা'], a: 'The company will be run by highly skilled professionals (operational team), similar to organizations like Unilever, GSK, and Standard Chartered. A Management Committee from the Board of Directors will supervise operations closely.' },
  { q: 'Who is leading Hayat Life Care?', keywords: ['leading', 'chairman', 'director', 'founder', 'চেয়ারম্যান'], a: 'The project is led by Chairman Capt. Md Showkat Hossain Chowdhury and Managing Director Dr. Mohammad Azizul Haque, along with founding directors.' },
  { q: 'Who is the Chairman?', keywords: ['chairman', 'showkat', 'চেয়ারম্যান'], a: 'Capt. Md Showkat Hossain Chowdhury — a seasoned Master Mariner who currently serves as the Chairman of Marinus Pvt. Ltd., Hayat Holdings and Hayat Life Care. He brings a distinguished track record of leadership spanning the marine and construction industries at both national and international levels.' },
  { q: 'Who is the Managing Director?', keywords: ['managing director', 'md', 'azizul', 'ব্যবস্থাপনা পরিচালক'], a: 'Dr. Mohammad Azizul Haque — the Founder Director of Park View Hospital, Ekhusey Hospital, Delta Hospital and Treatment Hospital in Chattogram. He also serves as an Associate Professor at Chattogram Medical College & Hospital.' },
  { q: 'How will profit be distributed?', keywords: ['profit', 'distribution', 'dividend', 'return', 'earning', 'মুনাফা', 'লাভ'], a: 'Profit will be distributed monthly to shareholders based on their share proportion after full operation begins and annually in the AGM.' },
  { q: 'What are the profit expectations?', keywords: ['profit expect', 'how much profit', 'return on investment', 'roi', 'expected return'], a: 'Based on feasibility studies, the project is expected to be financially strong. The expected distributable profit is around 10% from the 3rd year, with potential for steady growth.' },
  { q: 'How will transparency and accountability be ensured?', keywords: ['transparency', 'transparent', 'audit', 'reporting', 'স্বচ্ছতা', 'accountability'], a: 'The company will be audited by government-approved third-party audit firms.' },
  { q: 'Do I get registration of land/building?', keywords: ['registration', 'land', 'রেজিস্ট্রেশন', 'জমি'], a: 'For a company, all assets are always registered under the company name. All shareholders, including founder directors, are the combined owners of the spaces including land proportionately. So, you will not get separate registration but you are an owner.' },
  { q: 'Is there a buyback policy?', keywords: ['buyback', 'buy back', 'exit', 'sell back', 'return policy', 'ফেরত'], a: 'Yes, after 3 years of operation at 5% higher than the share value.' },
  { q: 'Do I need to pay extra for the hospital?', keywords: ['extra', 'additional payment', 'pay more', 'অতিরিক্ত'], a: 'No. You do not need to make any additional payments for hospital establishment or any other purpose. Your payment is fixed as per the agreement.' },
  { q: 'How to book a share?', keywords: ['book', 'appointment', 'contact', 'visit', 'বুকিং', 'যোগাযোগ', 'share buy', 'purchase'], a: 'Interested individuals must visit the office and proceed after satisfaction. Contact: 01335-074940 / 01335-074941.' },
  { q: 'What is the share price and benefit structure?', keywords: ['share price', 'price', 'benefit', 'tier', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'vip', 'দাম', 'মূল্য'], a: 'Bronze Shareholder (1 share, 10 Lacs): Benefits B1, B2, B8 | Silver Shareholder (2+ shares, 20-40 Lacs): Benefits B1, B2, B3, B8 | Gold Shareholder (5+ shares, 50-90 Lacs): Benefits B1, B2, B3, B4, B8 | Platinum Director (10+ shares, 1-1.4 Crore): Benefits B1-B5, B8 | Diamond Director (15+ shares, 1.5-1.9 Crore): Benefits B1-B6, B8 | VIP Director (20+ shares, 2+ Crore): All Benefits B1-B8' },
  { q: 'From where will hospital funding come?', keywords: ['funding', 'fund', 'money', 'source', 'অর্থায়ন'], a: '1st Phase: 2,500 shares × 10 Lacs = 250 Crore | 2nd Phase: 500 shares × 15 Lacs = 75 Crore | 3rd Phase: 1,000 shares × 20 Lacs = 200 Crore. No bank loans will be taken.' },
  { q: 'What is the maximum number of shares?', keywords: ['maximum shares', 'total shares', 'how many shares', 'share count', 'কতগুলো শেয়ার'], a: 'Maximum planned: 4,950 shares.' },
  { q: 'Can I sell my shares/directorship?', keywords: ['sell share', 'transfer', 'sell directorship', 'বিক্রি', 'হস্তান্তর'], a: 'Yes, with prior approval and applicable royalty.' },
  { q: 'How many shares have been sold?', keywords: ['sold', 'allocated', 'available', 'remaining', 'কত বিক্রি'], a: 'Currently, a significant number of shares have already been allocated. The first phase of share allocation is expected to be completed soon. Available shares are very limited.' },
  { q: 'What documents are required from the shareholder?', keywords: ['document required', 'documents needed', 'enrollment', 'কাগজপত্র দরকার'], a: 'Shareholder\'s National ID card (photocopy) | Nominee\'s National ID card (photocopy) | 2 copies of passport-size photographs | Completed application form with BDT 60,000 application fee | Our team will guide you through the entire process.' },
  { q: 'What is the mode of payment?', keywords: ['payment', 'installment', 'pay', 'down payment', 'পেমেন্ট', 'কিস্তি'], a: '50% on deed date, 25% within 30 days, 25% within 60–90 days.' },
  { q: 'What documents will Hayat provide?', keywords: ['documents provided', 'what will i get', 'certificate', 'কি কাগজ পাবো'], a: 'Agreement, Deposit slip, Receipt, Share certificate, and RJSC allotment letter.' },
  { q: 'What is the projected ROI?', keywords: ['roi', 'return on investment', 'payback'], a: 'Estimated ROI payback period is 5.3 years.' },
  { q: 'What are the main revenue streams?', keywords: ['revenue', 'income', 'earning source'], a: 'The project has 11 business wings. The main revenue stream will be the cancer diagnostic center, as it is the first of its kind in the second-largest city, supported by the other business wings.' },
  { q: 'What competitive advantages does Hayat Life Care have?', keywords: ['advantage', 'competitive', 'unique', 'different'], a: 'Modern healthcare model with better infrastructure, ample parking, unique model combining healthcare with lifestyle, and first-mover advantage as the first specialized cancer diagnostic hospital in the second largest city.' },
  { q: 'Will there be foreign partnerships?', keywords: ['foreign', 'international', 'partnership', 'collaboration', 'abroad'], a: 'Yes, we plan to collaborate with reputed hospitals and healthcare partners in India, Thailand, and Singapore.' },
  { q: 'What is the legal structure?', keywords: ['legal', 'plc', 'public limited', 'structure'], a: 'The company will be converted to a PLC (Public Limited Company) after final confirmation of the number of shares.' },
  { q: 'Are there lock-in periods?', keywords: ['lock-in', 'lock in', 'locked', 'restriction'], a: 'Yes, there is a lock-in period of up to 3 years from the start of operation. However, shareholders are free to sell or transfer their shares to others in accordance with the company policy.' },
  { q: 'What services are available?', keywords: ['service', 'wing', 'facility', 'facilities', 'what services', 'সেবা', 'সুবিধা'], a: 'Hayat Life Care has 11 Business Wings: Paid Parking, ATM Booth, Pharmacy, Optical Shop, Super Shop, Coffee Shop, Juice Bar, Restaurant, Kid\'s Amusement Park, Doctor\'s Chambers, and Diagnostic Center. Future expansion includes a specialized hospital.' },
  { q: 'Will any bank loan be taken?', keywords: ['bank loan', 'loan', 'debt', 'borrow', 'ব্যাংক লোন', 'ঋণ'], a: 'No. Hayat Life Care will not take any bank loan. The project is entirely funded by shareholder investments, ensuring no debt burden on the company.' },
];

// ─── Improved Fuzzy Matching Utilities ───

// Normalize text for matching: lowercase, remove punctuation, collapse whitespace
function normalize(text: string): string {
  return text.toLowerCase().replace(/[?!.,;:'"()\[\]{}\-–—]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Extract meaningful keywords from a question string
function extractKeywords(question: string): string[] {
  const stopWords = new Set(['is', 'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'it', 'this', 'that', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'what', 'how', 'when', 'where', 'who', 'which', 'there', 'here', 'i', 'you', 'we', 'they', 'my', 'your', 'our', 'their', 'any', 'not', 'about', 'tell', 'me', 'please', 'know', 'want', 'need', 'get']);
  const words = normalize(question).split(/\s+/);
  return words.filter(w => w.length > 2 && !stopWords.has(w));
}

// Generate n-grams (bigrams and trigrams) from text
function generateNGrams(text: string, n: number): string[] {
  const words = normalize(text).split(/\s+/);
  const ngrams: string[] = [];
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.push(words.slice(i, i + n).join(' '));
  }
  return ngrams;
}

// Calculate word overlap ratio between two texts
function wordOverlapRatio(text1: string, text2: string): number {
  const words1 = new Set(extractKeywords(text1));
  const words2 = new Set(extractKeywords(text2));
  if (words1.size === 0 || words2.size === 0) return 0;
  let overlap = 0;
  for (const w of words1) {
    if (words2.has(w)) overlap++;
  }
  return overlap / Math.min(words1.size, words2.size);
}

// Score how well a user message matches a FAQ entry (improved algorithm)
function scoreFAQMatch(userMsg: string, question: string, keywords: string[]): number {
  const normalizedMsg = normalize(userMsg);
  let score = 0;

  // 1. Exact question match (highest priority)
  if (normalizedMsg === normalize(question)) {
    return 1000;
  }

  // 2. Check explicit keywords (phrase-level matching)
  for (const keyword of keywords) {
    const normalizedKeyword = normalize(keyword);
    if (normalizedMsg.includes(normalizedKeyword)) {
      // Multi-word keyword matches get higher score
      const wordCount = normalizedKeyword.split(' ').length;
      score += normalizedKeyword.length * 3 * wordCount;
    }
  }

  // 3. Question word overlap (auto-extracted keywords from question)
  const questionKeywords = extractKeywords(question);
  let questionWordsMatched = 0;
  for (const word of questionKeywords) {
    if (normalizedMsg.includes(word)) {
      score += word.length;
      questionWordsMatched++;
    }
  }
  // Bonus for matching a high percentage of question keywords
  if (questionKeywords.length > 0) {
    const matchRatio = questionWordsMatched / questionKeywords.length;
    if (matchRatio >= 0.7) score += 20;
    if (matchRatio >= 0.5) score += 10;
  }

  // 4. Bigram matching (catches 2-word phrases)
  const msgBigrams = generateNGrams(normalizedMsg, 2);
  const qBigrams = generateNGrams(question, 2);
  for (const bigram of msgBigrams) {
    for (const qBigram of qBigrams) {
      if (bigram === qBigram) score += 8;
    }
  }

  // 5. Word overlap ratio bonus
  const overlap = wordOverlapRatio(userMsg, question);
  if (overlap >= 0.6) score += 15;
  if (overlap >= 0.4) score += 8;

  return score;
}

// Greeting detection
function isGreeting(msg: string): boolean {
  const greetings = ['hello', 'hi', 'hey', 'assalamualaikum', 'salam', 'good morning', 'good afternoon', 'good evening', 'হ্যালো', 'হাই', 'আসসালামু'];
  const normalized = msg.toLowerCase().trim();
  // Only consider as greeting if the message is short (greetings are short)
  if (normalized.split(/\s+/).length > 5) return false;
  return greetings.some(g => normalized.includes(g));
}

// Contact fallback message
const CONTACT_FALLBACK = `Thank you for your question! 🙏

This is beyond my current knowledge base. For detailed and personalized assistance, please reach out to our team directly:

📞 **Call:** 01335-074940 / 01335-074941
🏢 **Visit:** Mishmak Manjuri, Badshah Miah Road, Ameerbag, Chattogram
🕐 **Office Hours:** Open All Day

Our team will be happy to assist you!`;

// POST /api/chat - AI Chat endpoint (Dynamic FAQ + Fallback)
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
      // Collect all matches from both DB and fallback, then pick the best
      const allMatches: { answer: string; score: number; source: string }[] = [];

      // Step 1: Try matching from DATABASE FAQs first (admin-managed, real-time)
      try {
        const dbFaqs = await db.fAQ.findMany({
          where: { active: true },
          orderBy: { order: 'asc' },
        });

        if (dbFaqs.length > 0) {
          for (const faq of dbFaqs) {
            const autoKeywords = extractKeywords(faq.question);
            // Also add category as a keyword boost
            if (faq.category && faq.category !== 'general') {
              autoKeywords.push(faq.category.toLowerCase());
            }
            // Also extract keywords from the answer for broader matching
            const answerKeywords = extractKeywords(faq.answer).slice(0, 5);
            const combinedKeywords = [...autoKeywords, ...answerKeywords];
            
            const score = scoreFAQMatch(message, faq.question, combinedKeywords);
            if (score > 0) {
              // DB FAQs get a 10% bonus to prioritize admin-managed content
              allMatches.push({ answer: faq.answer, score: score * 1.1, source: 'db' });
            }
          }
        }
      } catch (dbError) {
        console.warn('Could not fetch FAQs from database, falling back to hardcoded:', dbError);
      }

      // Step 2: Also check the hardcoded fallback FAQ database
      for (const faq of FALLBACK_FAQ_DATABASE) {
        const score = scoreFAQMatch(message, faq.q, faq.keywords);
        if (score > 0) {
          allMatches.push({ answer: faq.a, score, source: 'fallback' });
        }
      }

      // Step 3: Pick the best match across both sources
      allMatches.sort((a, b) => b.score - a.score);
      const bestMatch = allMatches[0] || null;

      // Minimum score threshold of 5 to return a match
      if (bestMatch && bestMatch.score >= 5) {
        aiReply = bestMatch.answer;
      } else {
        aiReply = CONTACT_FALLBACK;
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
