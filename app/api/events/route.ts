import { NextRequest, NextResponse } from 'next/server';

// Server-only env vars (no NEXT_PUBLIC_ prefix) — never bundled into the browser
const DID_EXPLORER_BASE_URL =
  process.env.DID_EXPLORER_BASE_URL || 'http://127.0.0.1:8080';
const DID_EXPLORER_API_KEY = process.env.DID_EXPLORER_API_KEY;

/**
 * GET /api/events
 *
 * Server-side proxy to the did-explorer REST endpoint.
 * Injects the X-API-Key header so the secret never reaches the browser.
 *
 * All query parameters (limit, offset, user_address, did_type) are forwarded
 * transparently to the upstream.
 */
export async function GET(request: NextRequest) {
  if (!DID_EXPLORER_API_KEY) {
    console.error('[proxy] DID_EXPLORER_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 },
    );
  }

  const searchParams = request.nextUrl.searchParams.toString();
  const upstream = `${DID_EXPLORER_BASE_URL}/api/events${searchParams ? `?${searchParams}` : ''}`;

  try {
    const res = await fetch(upstream, {
      headers: { 'X-API-Key': DID_EXPLORER_API_KEY },
      // Bypass Next.js Data Cache — always hit the upstream for fresh data
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`[proxy] Upstream returned ${res.status} for ${upstream}`);
      return NextResponse.json(
        { error: 'Upstream API error', status: res.status },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[proxy] Failed to reach did-explorer:', err);
    return NextResponse.json(
      { error: 'Failed to connect to upstream API' },
      { status: 502 },
    );
  }
}
