import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode';

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ['/login', '/register'];

const commonPrivateRoutes = [
    '/dashboard',
    '/dashboard/change-password',
    '/doctors'
];

const roleBasedPrivateRoutes = {
    SUPER_ADMIN: [/^\/dashboard\/super-admin/],
    ADMIN: [/^\/dashboard\/admin/],
    DOCTOR: [/^\/dashboard\/doctor/],
    PATIENT: [/^\/dashboard\/patient/]
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = (await cookies()).get('accessToken')?.value;

    if (!accessToken) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (accessToken && commonPrivateRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    let decodeData = null;

    if (accessToken) {
        decodeData = jwtDecode(accessToken) as any;
    }

    const role = decodeData?.role;
    if (role && roleBasedPrivateRoutes[role as Role]) {
        const routes = roleBasedPrivateRoutes[role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: ['/login', '/register', '/dashboard/:page*', '/doctors/:page*'],
}