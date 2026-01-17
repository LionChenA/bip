const BASE_URL = import.meta.env.BASE_URL;

export const BASE_PATH =
  BASE_URL === '/' ? '' : BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;

export function path(p: string): string {
  if (!p) return BASE_PATH || '/';
  if (p.startsWith('http://') || p.startsWith('https://')) return p;

  const cleanPath = p.startsWith('/') ? p : `/${p}`;
  return `${BASE_PATH}${cleanPath}`;
}
