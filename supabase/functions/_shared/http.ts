function resolveAllowedOrigin(request?: Request): string {
  const requestOrigin = request?.headers.get('Origin');
  const configured = Deno.env.get('ALLOWED_ORIGIN');

  if (!configured || configured === '*') {
    return requestOrigin || '*';
  }

  if (requestOrigin && configured === requestOrigin) {
    return requestOrigin;
  }

  // Allow local Vite origins during development even when production origin is configured.
  if (
    requestOrigin &&
    (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(requestOrigin) ||
      requestOrigin === configured)
  ) {
    return requestOrigin;
  }

  return configured;
}

export function corsHeaders(request?: Request): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': resolveAllowedOrigin(request),
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type, x-supabase-authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

export function jsonResponse(body: unknown, status = 200, request?: Request): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(request),
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

export function handleOptions(request: Request): Response | null {
  if (request.method !== 'OPTIONS') return null;
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (contentLength > 50_000) throw new Error('Request body is too large');

  const value: unknown = await request.json();
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('A JSON object is required');
  }
  return value as Record<string, unknown>;
}

export function cleanString(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
