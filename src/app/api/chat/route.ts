import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { faqs as allFaqsFromData } from '@/data/home-data';

// Build fallback FAQ database directly from the comprehensive home-data.ts (62+ FAQs)
// This ensures chat ALWAYS has access to every FAQ without maintaining a separate list
const FALLBACK_FAQ_DATABASE = allFaqsFromData.map(faq => ({
  q: faq.q,
  a: faq.a,
  keywords: [] as string[], // No custom keywords needed — matching is done via question text
}));

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
            
            // Only match against question text and keywords — NOT answer content
            const score = scoreFAQMatch(message, faq.question, autoKeywords);
            if (score > 0) {
              // DB FAQs get a 10% bonus to prioritize admin-managed content
              allMatches.push({ answer: faq.answer, score: score * 1.1, source: 'db' });
            }
          }
        }
      } catch (dbError) {
        console.warn('Could not fetch FAQs from database, falling back to hardcoded:', dbError);
      }

      // Step 2: Check comprehensive FAQ list from home-data.ts (62+ FAQs, question-only matching)
      for (const faq of FALLBACK_FAQ_DATABASE) {
        const autoKeywords = extractKeywords(faq.q);
        const score = scoreFAQMatch(message, faq.q, autoKeywords);
        if (score > 0) {
          allMatches.push({ answer: faq.a, score, source: 'fallback' });
        }
      }

      // Step 3: Pick the best match across both sources
      allMatches.sort((a, b) => b.score - a.score);
      const bestMatch = allMatches[0] || null;

      // Minimum score threshold of 12 to avoid false matches
      if (bestMatch && bestMatch.score >= 12) {
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
