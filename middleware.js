import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'

const authentication = async (req) => {
    const cookie = await cookies();
    const res = await fetch(`${req.nextUrl.origin}/api/auth/token/?login=${cookie.get("__vi_xtc_edge")?.value}`);
    const data = await res.json();
    return data === 400 ? false : true;
}

export async function middleware(req) {

    if (req.nextUrl.pathname === "/") {
        const isLoggedIn = await authentication(req);
        return isLoggedIn ? NextResponse.redirect(new URL("/dashboard", req.url)) : NextResponse.redirect(new URL("/auth", req.url));
    }

    if (req.nextUrl.pathname.startsWith('/auth')) {
        const isLoggedIn = await authentication(req);
        return isLoggedIn ? NextResponse.redirect(new URL("/dashboard", req.url)) : NextResponse.next();
    }

    if (req.nextUrl.pathname === '/dashboard') {
        return NextResponse.redirect(new URL("/dashboard/invoice/create", req.url))
    }

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        const isLoggedIn = await authentication(req);
        return isLoggedIn ? NextResponse.next() : NextResponse.redirect(new URL("/auth", req.url))
    }

}