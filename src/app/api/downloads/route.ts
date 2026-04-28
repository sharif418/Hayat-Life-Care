import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST: Record a download event (with or without lead info)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, type = 'brochure', skipped = false } = body

    let leadId: string | null = null

    // If user provided name + phone (didn't skip), save as lead
    if (!skipped && name && phone) {
      const lead = await db.downloadLead.create({
        data: { name, phone, source: type },
      })
      leadId = lead.id
    }

    // Always record the download event
    const event = await db.downloadEvent.create({
      data: {
        type,
        hasLead: !skipped && !!name && !!phone,
        leadId,
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
      },
    })

    return NextResponse.json({ success: true, data: event })
  } catch (error) {
    console.error('Download tracking error:', error)
    return NextResponse.json({ success: false, error: 'Failed to record download' }, { status: 500 })
  }
}

// GET: Fetch download stats for admin
export async function GET() {
  try {
    const [leads, events, totalDownloads, leadsCount, skippedCount] = await Promise.all([
      db.downloadLead.findMany({ orderBy: { createdAt: 'desc' } }),
      db.downloadEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
      db.downloadEvent.count(),
      db.downloadEvent.count({ where: { hasLead: true } }),
      db.downloadEvent.count({ where: { hasLead: false } }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        leads,
        events,
        stats: {
          totalDownloads,
          leadsCount,
          skippedCount,
        },
      },
    })
  } catch (error) {
    console.error('Download stats error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 })
  }
}
