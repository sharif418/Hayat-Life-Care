import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { name, phone, date, time, doctor, message } = await request.json()
    if (!name || !phone || !date) {
      return Response.json({ error: 'Name, phone, and date are required' }, { status: 400 })
    }
    const appointment = await db.inquiry.create({
      data: {
        name,
        email: '',
        phone,
        subject: `Appointment: ${doctor || 'General'}`,
        message: `Date: ${date}, Time: ${time || 'N/A'}${message ? ', Notes: ' + message : ''}`,
        status: 'new',
      }
    })
    return Response.json({ success: true, data: appointment }, { status: 201 })
  } catch (error) {
    console.error('Appointment error:', error)
    return Response.json({ error: 'Failed to book appointment' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const appointments = await db.inquiry.findMany({
      where: { subject: { startsWith: 'Appointment:' } },
      orderBy: { createdAt: 'desc' },
    })
    return Response.json({ data: appointments })
  } catch (error) {
    console.error('Fetch appointments error:', error)
    return Response.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}
