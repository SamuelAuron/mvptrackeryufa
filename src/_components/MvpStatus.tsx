import { useEffect, useState } from "react";

interface MvpData {
  mob_id: number;
  killer_name: string;
  guild: string | null;
  timestamp: string;
}

export default function MvpStatus() {
  const [mvps, setMvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL da sua API backend
  const API_URL = "http://localhost:3000/api/mvps"; // ajuste se necessário

  useEffect(() => {
    async function fetchMvps() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Erro ao carregar dados");
        const data = await res.json();
        setMvps(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMvps();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Carregando MVPs...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen just bg-gray-100 p-6 flex-row">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Ragnarok MVP Tracker</h1>
        <p className="text-gray-600 mt-1">Últimos MVPs derrotados</p>
      </header>

      <div className=" grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 w-auto">
        {mvps.map((mvp) => (
          <div
            key={mvp.mob_id}
            className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition"
          >
            <img
              src={`http://db.irowiki.org/image/monster/${mvp.mob_id}.png`}
              alt={mvp.mob_id}
              className="w-16 h-16 mx-auto mb-2"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              MVP #{mvp.mob_id}
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-700">Matador:</span>{" "}
              {mvp.killer_name}
            </p>
            {mvp.guild && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-700">Guilda:</span>{" "}
                {mvp.guild}
              </p>
            )}
           
            <p className="text-xs text-gray-500 mt-2">
              Última morte:{" "}
              {new Date(mvp.timestamp).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}