"use client";
import { useMemo } from "react";
export default function WaitOverlay({ visible, message, progress }: { visible: boolean; message?: string; progress?: number }) {
  const pct = Math.max(0, Math.min(100, progress ?? 0));
  const styles = useMemo(()=>(
    <style>{`
      @keyframes dash { 0%{stroke-dashoffset:400} 100%{stroke-dashoffset:0} }
      @keyframes pen-move { 0%{ transform: translate(0,0) rotate(2deg) } 100%{ transform: translate(140px,-6px) rotate(-6deg) } }
      .path-animate { stroke-dasharray:400; stroke-dashoffset:400; animation: dash 2.5s ease-in-out infinite alternate; }
      .pen { animation: pen-move 2.5s ease-in-out infinite alternate; transform-origin:center; }
    `}</style>
  ),[]);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90">
      {styles}
      <div className="w-full max-w-md rounded-2xl border border-nhs-grey/20 bg-white p-6 shadow-lg ring-1 ring-nhs-grey/10">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-semibold text-nhs-dark">Personal Statement</h2>
          <p className="mt-1 text-sm text-nhs-grey">{message || "Thanks for waiting — we’re working behind the scenes."}</p>
        </div>
        <div className="flex justify-center">
          <svg width="280" height="120" viewBox="0 0 280 120" className="mb-4">
            <rect x="10" y="12" width="260" height="18" rx="4" fill="#E6F0FA" />
            <text x="20" y="25" fontSize="12" fontWeight={600} fill="#003087">Personal Statement</text>
            <path d="M20 50 L240 50" stroke="#005EB8" strokeWidth="2" className="path-animate" />
            <path d="M20 70 L240 70" stroke="#0072CE" strokeWidth="2" className="path-animate" style={{animationDelay:"0.2s"}} />
            <path d="M20 90 L200 90" stroke="#00A499" strokeWidth="2" className="path-animate" style={{animationDelay:"0.4s"}} />
            <g className="pen">
              <polygon points="210,92 225,98 212,86" fill="#003087" />
              <rect x="225" y="96" width="18" height="6" fill="#425563" />
              <rect x="243" y="95" width="10" height="8" fill="#0072CE" />
            </g>
          </svg>
        </div>
        <div className="w-full">
          <div className="h-2 w-full rounded bg-gray-200">
            <div className="h-2 rounded bg-nhs-blue transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-nhs-grey"><span>Status</span><span>{pct}%</span></div>
        </div>
        <p className="mt-3 text-xs text-nhs-grey/80">Please keep this tab open. You’ll receive the result by email.</p>
      </div>
    </div>
  );
}
