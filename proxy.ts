import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const locales = ['es', 'en', 'pt']
const defaultLocale = 'es'
const SESSION_COOKIE = 'portal_session'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || ''
  const preferred = acceptLanguage
    .split(',')
    .map((l) => l.split(';')[0].trim().toLowerCase())
  for (const lang of preferred) {
    const short = lang.substring(0, 2)
    if (locales.includes(short)) return short
  }
  return defaultLocale
}

function getPortalSecret(): Uint8Array {
  const raw = process.env.PORTAL_JWT_SECRET ?? ''
  return new TextEncoder().encode(raw)
}

async function hasValidPortalSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, getPortalSecret())
    return payload.typ === 'session'
  } catch {
    return false
  }
}

// Protected: /portal/<anything> except /portal/login and /portal/auth/*
function portalNeedsAuth(pathname: string): boolean {
  if (!pathname.startsWith('/portal')) return false
  if (pathname === '/portal/login' || pathname.startsWith('/portal/login/')) return false
  if (pathname.startsWith('/portal/auth/')) return false
  return true
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- PORTAL GATE (magic-link session) ------------------------------------
  if (pathname.startsWith('/portal')) {
    if (portalNeedsAuth(pathname)) {
      const authed = await hasValidPortalSession(request)
      if (!authed) {
        const loginUrl = new URL('/portal/login', request.url)
        loginUrl.searchParams.set('returnTo', pathname + request.nextUrl.search)
        return NextResponse.redirect(loginUrl)
      }
    }
    // El portal NO lleva locale prefix: termina acá.
    return NextResponse.next()
  }

  // --- LOCALE REWRITE (resto del portfolio) --------------------------------
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Skip internal Next.js paths, static files, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  const locale = getLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
