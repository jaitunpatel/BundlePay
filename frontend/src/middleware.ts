import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WAITLIST_MODE = process.env.NEXT_PUBLIC_WAITLIST_MODE === "true";

const PUBLIC_PATHS = [
  "/",
  "/landing-page",
  "/waitlist",
  "/bundle-catalog",
  "/sign-in",
];

export function middleware(req: NextRequest) {
  if (!WAITLIST_MODE) return NextResponse.next();

  const { pathname } = req.nextUrl;
  console.log("MW PATH =", pathname);

  if (pathname.startsWith("/checkout-payment") || pathname.startsWith("/subscription-management")) {
    const url = req.nextUrl.clone();
    url.pathname = "/waitlist";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
    }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml")
  ) {
    return NextResponse.next();
  }

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isPublic) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/waitlist";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
