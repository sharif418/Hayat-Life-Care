import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Check if already subscribed
    const existing = await db.inquiry.findFirst({
      where: { email, subject: 'Newsletter Subscription' }
    })

    if (existing) {
      return Response.json({ error: 'Already subscribed' }, { status: 409 })
    }

    await db.inquiry.create({
      data: {
        name: 'Newsletter Subscriber',
        email,
        phone: '',
        subject: 'Newsletter Subscription',
        message: `Newsletter subscription for ${email}`,
        status: 'new',
      }
    })

    return Response.json({ success: true, message: 'Subscribed successfully' }, { status: 201 })
  } catch (error) {
    console.error('Newsletter error:', error)
    return Response.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
