import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwtToken } from './lib/auth';

const ADMIN_PROTECTED_ROUTES = [
  // Routes where ALL methods except OPTIONS are protected
  { path: '/api/inquiries', methods: ['GET', 'PATCH', 'PUT', 'DELETE'] },
  { path: '/api/appointments', methods: ['GET', 'PATCH', 'PUT', 'DELETE'] },
  { path: '/api/downloads', methods: ['GET', 'PATCH', 'PUT', 'DELETE'] },
  { path: '/api/visits', methods: ['GET', 'PATCH', 'PUT', 'DELETE'] },
  
  // Routes where GET is public, but other methods are protected
  { path: '/api/site-settings', methods: ['POST', 'PUT', 'PATCH', 'DELETE'] },
  { path: '/api/faqs', methods: ['POST', 'PUT', 'PATCH', 'DELETE'] },
  { path: '/api/faqs/', methods: ['POST', 'PUT', 'PATCH', 'DELETE'], prefixMatch: true },
  { path: '/api/videos', methods: ['POST', 'PUT', 'PATCH', 'DELETE'] },
  { path: '/api/videos/', methods: ['POST', 'PUT', 'PATCH', 'DELETE'], prefixMatch: true },
  { path: '/api/services', methods: ['POST', 'PUT', 'PATCH', 'DELETE'] },
  { path: '/api/services/', methods: ['POST', 'PUT', 'PATCH', 'DELETE'], prefixMatch: true },
  { path: '/api/leaders', methods: ['POST', 'PUT', 'PATCH', 'DELETE'] },
  { path: '/api/leaders/', methods: ['POST', 'PUT', 'PATCH', 'DELETE'], prefixMatch: true },
  { path: '/api/testimonials', methods: ['POST', 'PUT', 'PATCH', 'DELETE'] },
  { path: '/api/testimonials/', methods: ['POST', 'PUT', 'PATCH', 'DELETE'], prefixMatch: true },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Check if current route requires admin auth
  let requiresAuth = false;

  for (const route of ADMIN_PROTECTED_ROUTES) {
    if (route.prefixMatch) {
      if (pathname.startsWith(route.path) && route.methods.includes(method)) {
        requiresAuth = true;
        break;
      }
    } else {
      if (pathname === route.path && route.methods.includes(method)) {
        requiresAuth = true;
        break;
      }
    }
  }

  // Also protect any dynamic path like /api/inquiries/[id]
  if (pathname.startsWith('/api/inquiries/') && method !== 'OPTIONS') requiresAuth = true;
  if (pathname.startsWith('/api/appointments/') && method !== 'OPTIONS') requiresAuth = true;

  if (requiresAuth) {
    const token = request.cookies.get('hlc_admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const payload = await verifyJwtToken(token);
    
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 401 });
    }

    // Token is valid, let the request proceed
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
