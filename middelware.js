import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        // Public pages
        const publicRoutes = ["/", "/login", "/register"]
        if (publicRoutes.includes(pathname)) return true

        // Protected pages need a token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    // Skip /api/auth entirely to avoid NextAuth JSON issues
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}
