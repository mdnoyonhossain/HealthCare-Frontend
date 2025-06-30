import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode';

type Role = keyof typeof roleBasedPrivateRoutes;

const commonPrivateRoutes = [
    '/dashboard',
    '/dashboard/change-password'
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
        return NextResponse.redirect(new URL('/login', request.url));
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
    matcher: '/dashboard/:page*',
}