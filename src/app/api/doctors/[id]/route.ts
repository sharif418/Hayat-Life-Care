import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.doctor.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Doctor not found' },
        { status: 404 }
      )
    }

    const doctor = await db.doctor.update({
      where: { id },
      data: body,
    })

    return NextResponse.json({ success: true, data: doctor })
  } catch (error) {
    console.error('Failed to update doctor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update doctor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.doctor.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Doctor not found' },
        { status: 404 }
      )
    }

    await db.doctor.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Doctor deleted successfully' })
  } catch (error) {
    console.error('Failed to delete doctor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete doctor' },
      { status: 500 }
    )
  }
}
