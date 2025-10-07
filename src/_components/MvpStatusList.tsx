import { useEffect, useState } from "react";

export interface MvpData {
  mob_id: number;
  killer_name: string;
  guild: string | null;
  timestamp: string;
}

export default function MvpStatusList() {
  const [deadMvps, setDeadMvps] = useState<MvpData[]>([]);
  const [aliveMvps, setAliveMvps] = useState<MvpData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://apiprojetoyufa.onrender.com/api/mvps");
        const data: MvpData[] = await res.json();

        const now = new Date();
        const dead: MvpData[] = [];
        const alive: MvpData[] = [];

        data.forEach((mvp) => {
          const killedAt = new Date(mvp.timestamp);
          const diffHours = (now.getTime() - killedAt.getTime()) / (1000 * 60 * 60);

          if (diffHours < 1) {
            dead.push(mvp);
          } else {
            alive.push(mvp);
          }
        });

        setDeadMvps(dead);
        setAliveMvps(alive);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000); // atualiza a cada 1 minuto
    return () => clearInterval(interval);
  }, []);

  // Função para mostrar quanto tempo falta até o MVP "renascer"
  function getRespawnTime(timestamp: string) {
    const killedAt = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - killedAt.getTime();
    const diffMinutes = Math.floor(60 - diffMs / 1000 / 60);
    return diffMinutes > 0 ? `${diffMinutes} min restante` : "Respawn disponível";
  }

  return (
    <div className="flex flex-1 w-screen bg-gray-900 text-white p-6 flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
        🧭 Status dos MVPs
      </h1>
      
      {/* MVPs Mortos */}
      <section className="mb-12 mr-12">
        <h2 className="text-2xl font-semibold mb-4 text-red-400 flex items-center gap-2">
          💀 MVPs Mortos
        </h2>
        {deadMvps.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deadMvps.map((mvp: MvpData) => (
              <div
                key={mvp.mob_id}
                className="bg-gray-800 border border-red-600 rounded-2xl p-4 shadow-lg hover:shadow-red-500/30 transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <img
              src={`http://db.irowiki.org/image/monster/${mvp.mob_id}.png`}
              alt={`${mvp.mob_id}`}
              className="w-16 h-16 mx-auto mb-2"
            />
                  <span className="font-bold text-lg">ID {mvp.mob_id}</span>
                  <span className="text-xs text-gray-400">
                    {getRespawnTime(mvp.timestamp)}
                  </span>
                </div>
                <p>
                  <span className="font-semibold text-red-300">Matador:</span>{" "}
                  {mvp.killer_name}
                </p>
                <p>
                  <span className="font-semibold text-red-300">Guilda:</span>{" "}
                  {mvp.guild || "—"}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(mvp.timestamp).toLocaleString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Nenhum MVP morto na última hora 😴</p>
        )}
      </section>

      {/* MVPs Vivos */}
      <section className="mb-12 mr-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-2">
          🌱 MVPs Vivos
        </h2>
        {aliveMvps.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aliveMvps.map((mvp) => (
              <div
                key={mvp.mob_id}
                className="bg-gray-800 border border-green-600 rounded-2xl p-4 shadow-lg hover:shadow-green-500/30 transition"
              >
                <img
              src={`http://db.irowiki.org/image/monster/${mvp.mob_id}.png`}
              alt={`${mvp.mob_id}`}
              className="w-16 h-16 mx-auto mb-2"
            />
                <span className="font-bold text-lg block mb-2">ID {mvp.mob_id}</span>
                <span className="font-bold text-lg block mb-2">Hora da Morte: {new Date(mvp.timestamp).toLocaleString("pt-BR")}</span>
                <span className="text-sm text-gray-400">Disponível para caça 🏹</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Todos os MVPs estão mortos 💀</p>
        )}
      </section>
    </div>
  );
}