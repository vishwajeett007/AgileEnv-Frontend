import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: ["/reset-password", "/verify-email", "/verify-otp", "/login", "/sign-up", "/forgot-password"],
};