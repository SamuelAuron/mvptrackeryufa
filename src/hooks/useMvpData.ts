import { useEffect, useState } from "react";
import { fetchJson } from "../utils/fetchData";
import { fetchMvpInfo } from "../utils/fetchMvpInfo";

interface MvpKillData {
  mob_id: number;
  killer_name: string;
  guild: string | null;
  timestamp: string;
}
/*
interface MvpInfo {
  id: number;
  name: string;
  level: number;
  mapname: string;
  image: string;
}*/

interface CombinedMvp {
  mob_id: number;
  killer_name: string;
  guild: string | null;
  timestamp: string;
  name?: string;
  level?: number;
  mapname?: string;
  image?: string;
}

export function useMvpData() {
  const [mvpsData, setMvpsData] = useState<CombinedMvp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const kills = await fetchJson<MvpKillData[]>("http://localhost:3000/api/mvps");
      
      if (kills) {
        // Buscar informações de cada MVP da API externa
        const enriched = await Promise.all(
          kills.map(async (mvp) => {
            const info = await fetchMvpInfo(mvp.mob_id);
            return {
              ...mvp,
              name: info?.monster_info ?? "Desconhecido",
              level: info?.level ?? null,
              mapname: info?.main_stats.hp ?? null,
              image: info?.gif ?? null,
            };
          })
        );
        setMvpsData(enriched);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  return { mvpsData, loading };
}