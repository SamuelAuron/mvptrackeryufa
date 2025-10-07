export async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar ${url}: ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Erro no fetchJson:", error);
    return null;
  }
}