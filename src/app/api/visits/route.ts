import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST: Record a site visit
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { visitorId, page = '/', referrer } = body

    if (!visitorId) {
      return NextResponse.json({ success: false, error: 'visitorId required' }, { status: 400 })
    }

    // Check if this visitor has visited today (for unique tracking)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existingToday = await db.siteVisit.findFirst({
      where: {
        visitorId,
        createdAt: { gte: today },
      },
    })

    const visit = await db.siteVisit.create({
      data: {
        visitorId,
        page,
        referrer: referrer || null,
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
        isUnique: !existingToday, // first visit from this visitor today
      },
    })

    return NextResponse.json({ success: true, data: visit })
  } catch (error) {
    console.error('Visit tracking error:', error)
    return NextResponse.json({ success: false, error: 'Failed to record visit' }, { status: 500 })
  }
}

// GET: Fetch visit stats for admin
export async function GET() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    thirtyDaysAgo.setHours(0, 0, 0, 0)

    const [
      totalPageViews,
      totalUniqueVisitors,
      todayPageViews,
      todayUniqueVisitors,
      weekPageViews,
      weekUniqueVisitors,
      monthPageViews,
      monthUniqueVisitors,
      recentVisits,
    ] = await Promise.all([
      db.siteVisit.count(),
      db.siteVisit.count({ where: { isUnique: true } }),
      db.siteVisit.count({ where: { createdAt: { gte: today } } }),
      db.siteVisit.count({ where: { isUnique: true, createdAt: { gte: today } } }),
      db.siteVisit.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      db.siteVisit.count({ where: { isUnique: true, createdAt: { gte: sevenDaysAgo } } }),
      db.siteVisit.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      db.siteVisit.count({ where: { isUnique: true, createdAt: { gte: thirtyDaysAgo } } }),
      db.siteVisit.findMany({ orderBy: { createdAt: 'desc' }, take: 30 }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalPageViews,
          totalUniqueVisitors,
          todayPageViews,
          todayUniqueVisitors,
          weekPageViews,
          weekUniqueVisitors,
          monthPageViews,
          monthUniqueVisitors,
        },
        recentVisits,
      },
    })
  } catch (error) {
    console.error('Visit stats error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 })
  }
}
