export async function postData<T = unknown>(
  path: string,
  data: Record<string, unknown>,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("API error:", errorData); // 👈 add this
    throw new Error(errorData.message || "Something went wrong");
  }

  return res.json();
}
