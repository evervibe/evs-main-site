import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for EVS Main Site
 * Handles request logging and error boundaries
 */
export function middleware(request: NextRequest) {
  try {
    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname}`);
    }

    // Continue with the request
    return NextResponse.next();
  } catch (error) {
    // Log error and continue
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

// Configure paths to run middleware on
// Exclude Next.js internals and static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
