"use client";
import { useEffect, useState } from "react";
type JobStatus = { order_id: string; status: string; progress: number; error?: string|null };
export function useJobProgress(orderId?: string, backendUrl?: string, intervalMs = 2000) {
  const [status, setStatus] = useState<JobStatus | null>(null);
  useEffect(() => {
    if (!orderId || !backendUrl) return;
    let stop = false;
    const tick = async () => {
      try {
        const r = await fetch(`${backendUrl}/job/${orderId}/status`, { cache: "no-store" });
        const j = await r.json();
        if (!stop) setStatus(j);
      } catch {}
    };
    tick(); const t = setInterval(tick, intervalMs);
    return () => { stop = true; clearInterval(t); };
  }, [orderId, backendUrl, intervalMs]);
  return status;
}
