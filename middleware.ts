/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
 
export async function middleware(req: NextRequest, res: NextResponse) {
  
  const session:any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const requestedPage = req.nextUrl.pathname;
  const validRoles = ["admin", "super-user", "SEO"];
 
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;
   
    if(requestedPage.startsWith("/api/admin")){
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(url);
  }

  if ( requestedPage.startsWith("/admin") && !validRoles.includes(session.user.role)){
    return NextResponse.redirect(new URL("/", req.url));
  }

  if ( requestedPage.startsWith("/api/admin") && !validRoles.includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
 
  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/checkout/address', 
    // '/checkout/summary',
    "/checkout/:path*",
    "/orders/:path*",
    "/api/orders/:path*",
    "/api/admin/:path*",
    "/admin/:path*", 
  ]
};