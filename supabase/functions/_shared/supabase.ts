function requiredEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export function supabaseUrl(path: string): string {
  return `${requiredEnv('SUPABASE_URL')}${path}`;
}

export function serviceHeaders(extra: HeadersInit = {}): Headers {
  const serviceKey = requiredEnv('SUPABASE_SERVICE_ROLE_KEY');
  const headers = new Headers(extra);
  headers.set('apikey', serviceKey);
  headers.set('Authorization', `Bearer ${serviceKey}`);
  return headers;
}

export async function serviceRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(supabaseUrl(path), {
    ...init,
    headers: serviceHeaders(init.headers),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Supabase request failed:', response.status, detail);
    throw new Error('Database operation failed');
  }

  if (response.status === 204) return undefined as T;
  const body = await response.text();
  return (body ? JSON.parse(body) : undefined) as T;
}

export async function requireAdmin(request: Request): Promise<void> {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) throw new Error('Unauthorized');

  const anonKey = requiredEnv('SUPABASE_ANON_KEY');
  const response = await fetch(supabaseUrl('/auth/v1/user'), {
    headers: {
      apikey: anonKey,
      Authorization: authorization,
    },
  });

  if (!response.ok) throw new Error('Unauthorized');
}
