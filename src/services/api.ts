export async function api<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const res = await fetch(`http://localhost:3000/api/${input}`, init);

  return res.json() as T;
}
