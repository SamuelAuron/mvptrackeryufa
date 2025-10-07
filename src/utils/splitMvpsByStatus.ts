import type { MvpData } from "../_components/MvpStatusList";

export function splitMvpsByStatus(mvps: MvpData[]) {
  const now = new Date();
  const vivos: MvpData[] = [];
  const mortos: MvpData[] = [];

  mvps.forEach(mvp => {
    const diffHours =
      (now.getTime() - new Date(mvp.timestamp).getTime()) / (1000 * 60 * 60);

    if (diffHours > 1) {
      vivos.push(mvp);
    } else {
      mortos.push(mvp);
    }
  });

  return { vivos, mortos };
}
