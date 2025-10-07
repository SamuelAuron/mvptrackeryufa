import { useMvpData } from "../hooks/useMvpData";
import { splitMvpsByStatus } from "../utils/splitMvpsByStatus";

export default function MvpList2() {
  const { mvpsData, loading } = useMvpData();
console.log(mvpsData)
  if (loading) return <p>Carregando...</p>;

  const { vivos, mortos } = splitMvpsByStatus(mvpsData);
  
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">🩸 MVPs Mortos</h2>
      <ul>
        {mortos.map(mvp => (
          <li key={mvp.mob_id} className="flex items-center gap-2 mb-2">
            
            <span>{mvp.name}</span> — morto por <strong>{mvp.killer_name}</strong>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-bold mt-6 mb-2">💀 MVPs Vivos</h2>
      <ul>
        {vivos.map(mvp => (
          <li key={mvp.mob_id} className="flex items-center gap-2 mb-2">
            
            <span>{mvp.name}</span> — <i>{mvp.mapname}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}