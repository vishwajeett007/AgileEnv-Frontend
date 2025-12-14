import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isLoggedIn = request.cookies.get("access_token")?.value;
    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    const token = request.cookies.get("reset_token")?.value;

    if (pathname.startsWith("/reset-password")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/reset-password"],
};