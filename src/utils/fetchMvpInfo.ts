// src/utils/fetchMvpInfo.ts
export async function fetchMvpInfo(id: number) {
  const url = `http://localhost:3000/api/mvps_info/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados do MVP ${id}`);
    }

    const data = await response.json();
    console.log("data")
    console.log(data)
    return data; // Contém nome, hp, sprite, mapa, etc.
  } catch (error) {
    console.error("Erro em fetchMvpInfo:", error);
    return null;
  }
}
