"use client";
import { useState } from "react";
export default function ChatAssistant({ roleId, jobSummary, onFinish }: { roleId: string; jobSummary?: string; onFinish?: (summary: string)=>void }) {
  const [session, setSession] = useState<string|null>(null);
  const [q, setQ] = useState<string|null>(null);
  const [ans, setAns] = useState("");
  const [progress, setProgress] = useState(0);
  const start = async () => {
    const r = await fetch("/api/assistant/start", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ role_id: roleId, job_summary: jobSummary||"", consent_pre_ai:true }) });
    const j = await r.json(); setSession(j.session_id); setQ(j.first_question);
  };
  const reply = async () => {
    if (!session) return;
    const r = await fetch("/api/assistant/reply", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ session_id: session, user_answer: ans }) });
    const j = await r.json();
    if (j.next_question) { setQ(j.next_question); setProgress(j.progress||0); setAns(""); }
    else { setProgress(100); setQ(null); if (j.finished_summary && onFinish) onFinish(j.finished_summary); }
  };
  return (
    <div className="p-4 rounded border shadow-sm bg-white">
      {!session && <button onClick={start} className="px-4 py-2 bg-nhs-blue text-white rounded">Use AI Coach (fast)</button>}
      {session && q && (
        <div className="mt-3">
          <p className="font-medium">{q}</p>
          <textarea className="w-full mt-2 p-2 border rounded" rows={3} value={ans} onChange={(e)=>setAns(e.target.value)} />
          <div className="mt-2 flex justify-between items-center text-sm">
            <span className="text-gray-500">{progress}%</span>
            <button onClick={reply} disabled={!ans} className="px-3 py-1 bg-nhs-bright text-white rounded">Submit</button>
          </div>
        </div>
      )}
      {session && !q && <p className="text-sm text-gray-600 mt-2">Processing summary...</p>}
    </div>
  );
}
