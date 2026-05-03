import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { signJwtToken } from '@/lib/auth';
import bcrypt from 'bcrypt';
import { RateLimiter } from '@/lib/rate-limit';

// Allow 5 login attempts per 15 minutes
const loginLimiter = new RateLimiter(5, 15 * 60 * 1000);

// POST /api/admin/login - Admin login
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown-ip';
    if (!loginLimiter.limit(ip)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Look up admin user in database
    const admin = await db.adminUser.findUnique({ where: { email } });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password (support both bcrypt and plain text for backward compatibility before migration)
    const isValidPassword = 
      admin.password === password || 
      (admin.password.startsWith('$2') && await bcrypt.compare(password, admin.password));

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await signJwtToken({ id: admin.id, email: admin.email, role: admin.role });

    const response = NextResponse.json({
      success: true,
      data: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });

    // Set HttpOnly cookie
    response.cookies.set({
      name: 'hlc_admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
