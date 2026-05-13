import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    const adminEmail = 'admin@hayatlifecare.com';
    const existingAdmin = await db.adminUser.findUnique({
      where: { email: adminEmail }
    });

    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin user already exists.' });
    }

    // Usually default is just "password" or a bcrypt hash of "password"
    // Since the login route handles both, we can just save it as plain text "password" or hashed
    const hashedPassword = await bcrypt.hash('password', 10);
    
    await db.adminUser.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
        role: 'ADMIN'
      }
    });

    return NextResponse.json({ message: 'Admin user created successfully. Email: admin@hayatlifecare.com, Password: password' });
  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: 'Failed to create admin user', details: error?.message || String(error) }, { status: 500 });
  }
}
