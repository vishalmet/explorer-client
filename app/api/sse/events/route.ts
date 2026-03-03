import { NextResponse } from 'next/server';

// Server-only env vars — never bundled into the browser
const DID_EXPLORER_BASE_URL =
  process.env.DID_EXPLORER_BASE_URL || 'http://127.0.0.1:8080';
const DID_EXPLORER_API_KEY = process.env.DID_EXPLORER_API_KEY;

/**
 * GET /api/sse/events
 *
 * Server-side SSE proxy to the did-explorer SSE endpoint.
 * Streams the upstream response body directly to the browser while injecting
 * the X-API-Key header so the secret never leaves the server.
 *
 * The response is a long-lived text/event-stream connection.
 */
export async function GET() {
  if (!DID_EXPLORER_API_KEY) {
    console.error('[sse-proxy] DID_EXPLORER_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 },
    );
  }

  const upstream = `${DID_EXPLORER_BASE_URL}/api/sse/events`;

  try {
    const res = await fetch(upstream, {
      headers: { 'X-API-Key': DID_EXPLORER_API_KEY },
      cache: 'no-store',
    });

    if (!res.ok || !res.body) {
      console.error(`[sse-proxy] Upstream returned ${res.status}`);
      return NextResponse.json(
        { error: 'Upstream SSE error', status: res.status },
        { status: res.status },
      );
    }

    // Stream the upstream SSE body straight through to the client
    return new Response(res.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        // Prevent reverse-proxies (nginx, Cloudflare) from buffering SSE
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    console.error('[sse-proxy] Failed to reach did-explorer SSE:', err);
    return NextResponse.json(
      { error: 'Failed to connect to SSE upstream' },
      { status: 502 },
    );
  }
}

// Force dynamic rendering — SSE connections are long-lived and unique per client
export const dynamic = 'force-dynamic';
