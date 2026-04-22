import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const doctors = await db.doctor.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ success: true, data: doctors })
  } catch (error) {
    console.error('Failed to fetch doctors:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch doctors' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, specialty, designation, image, chamber, floor, schedule, bio, order } = body

    if (!name || !specialty) {
      return NextResponse.json(
        { success: false, error: 'Name and specialty are required' },
        { status: 400 }
      )
    }

    const doctor = await db.doctor.create({
      data: {
        name,
        specialty,
        designation: designation || null,
        image: image || null,
        chamber: chamber || null,
        floor: floor || null,
        schedule: schedule || null,
        bio: bio || null,
        order: order || 0,
      },
    })

    return NextResponse.json({ success: true, data: doctor }, { status: 201 })
  } catch (error) {
    console.error('Failed to create doctor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create doctor' },
      { status: 500 }
    )
  }
}
