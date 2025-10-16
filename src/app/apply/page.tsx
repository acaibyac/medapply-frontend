"use client";
import { useEffect, useMemo, useState } from "react";
import ChatAssistant from "@/components/ChatAssistant";
import WaitOverlay from "@/components/WaitOverlay";

type JobItem = { id:number; filename:string; title:string|null; band:number|null };

export default function ApplyPage() {
  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const [step, setStep] = useState(1);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [selectedJob, setSelectedJob] = useState<number|undefined>();
  const [jobInfo, setJobInfo] = useState<{role_key:string; band:number|null; title:string|null; summary:string; questions:string[]}|null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [coachSummary, setCoachSummary] = useState<string>("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [progress, setProgress] = useState(0);

  // load jobs
  useEffect(() => { fetch(`${BACKEND}/jobs/local`).then(r=>r.json()).then(setJobs).catch(()=>{}); }, [BACKEND]);

  // load questions for job
  useEffect(() => {
    if (!selectedJob) return setJobInfo(null as any);
    fetch(`${BACKEND}/jobs/questions/for_job/${selectedJob}`).then(r=>r.json()).then(setJobInfo).catch(()=>{});
  }, [selectedJob, BACKEND]);

  const startPreview = async () => {
    const r = await fetch(`${BACKEND}/statement/preview`, {
      method:"POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ title: jobInfo?.title, band: jobInfo?.band, answers, coach_summary: coachSummary || undefined })
    });
    const j = await r.json();
    // simplistic preview: open in modal/alert; integrate your preview UI as you wish
    alert(j.preview_text);
  };

  const dummyPayAndRun = async () => {
    // aici ai integrarea reală cu Stripe; pentru demo, simulăm progresul
    setShowOverlay(true); setProgress(0);
    const ticks = [10,35,60,75,85,95,100];
    for (const p of ticks) { setProgress(p); await new Promise(res=>setTimeout(res, 600)); }
    setShowOverlay(false);
    alert("✅ Payment simulated. Your statement will be emailed shortly.");
  };

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold text-nhs-dark">Apply for your NHS Personal Statement</h1>
      <p className="text-sm text-nhs-grey mt-1">Follow the steps below. You can use our AI Coach or answer questions manually.</p>

      {/* Stepper */}
      <div className="mt-6 flex items-center gap-2 text-sm">
        {[1,2,3,4].map((s)=>(
          <div key={s} className={`flex items-center gap-2 ${step===s?'font-semibold text-nhs-dark':'text-gray-500'}`}>
            <div className={`h-6 w-6 rounded-full grid place-items-center ${step>=s?'bg-nhs-blue text-white':'bg-gray-200 text-gray-700'}`}>{s}</div>
            <span>{["Choose job","Prepare","Preview","Pay & Generate"][s-1]}</span>
            {s<4 && <div className="mx-2 h-px w-10 bg-gray-300" />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step===1 && (
        <section className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-gray-200">
          <h2 className="text-lg font-medium text-nhs-dark">1) Choose your job</h2>
          <p className="text-sm text-gray-600 mb-3">Select from our local catalogue (files you added in <code>backend/job_posts/</code>).</p>
          <select className="w-full border rounded p-2" value={selectedJob ?? ""} onChange={(e)=>setSelectedJob(Number(e.target.value)||undefined)}>
            <option value="">— Select role —</option>
            {jobs.map(j => <option key={j.id} value={j.id}>{j.title || j.filename} {j.band ? `(Band ${j.band})` : ""}</option>)}
          </select>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-nhs-blue text-white rounded disabled:opacity-60" disabled={!selectedJob} onClick={()=>setStep(2)}>Continue</button>
          </div>
        </section>
      )}

      {/* Step 2 */}
      {step===2 && (
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
            <h2 className="text-lg font-medium text-nhs-dark">2) Prepare — Manual Questions</h2>
            {jobInfo?.questions?.length ? (
              <div className="mt-2 space-y-3">
                {jobInfo.questions.map((q, idx)=>(
                  <div key={idx}>
                    <label className="text-sm font-medium text-gray-700">{q}</label>
                    <textarea rows={3} className="mt-1 w-full rounded border p-2" value={answers[idx]||""} onChange={(e)=>{
                      const v=[...answers]; v[idx]=e.target.value; setAnswers(v);
                    }} />
                  </div>
                ))}
                <p className="text-xs text-gray-500">Tip: You can switch to AI Coach on the right anytime.</p>
              </div>
            ) : <p className="text-sm text-gray-600">Select a job first.</p>}
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
            <h3 className="text-lg font-medium text-nhs-dark">AI Coach (optional)</h3>
            <p className="text-sm text-gray-600">Uses GPT-5-mini. Cheap, fast, and on-device friendly experience.</p>
            {!!jobInfo && <div className="mt-3">
              <ChatAssistant roleId={jobInfo.role_key} jobSummary={jobInfo.summary} onFinish={(sum)=>setCoachSummary(sum)} />
              {coachSummary && <div className="mt-3 rounded border p-2 text-sm bg-gray-50"><b>Coach summary:</b><br/>{coachSummary}</div>}
            </div>}
          </div>
          <div className="col-span-full flex justify-between">
            <button className="px-4 py-2 rounded border" onClick={()=>setStep(1)}>Back</button>
            <button className="px-4 py-2 bg-nhs-blue text-white rounded" onClick={()=>setStep(3)}>Continue</button>
          </div>
        </section>
      )}

      {/* Step 3 */}
      {step===3 && (
        <section className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-gray-200">
          <h2 className="text-lg font-medium text-nhs-dark">3) Preview</h2>
          <p className="text-sm text-gray-600">We’ll generate a quick preview text (no cost). You can still edit answers.</p>
          <div className="mt-3 flex gap-3 justify-end">
            <button className="px-4 py-2 rounded border" onClick={()=>setStep(2)}>Back</button>
            <button className="px-4 py-2 bg-nhs-bright text-white rounded" onClick={startPreview}>Generate Preview</button>
            <button className="px-4 py-2 bg-nhs-blue text-white rounded" onClick={()=>setStep(4)}>Looks good → Continue</button>
          </div>
        </section>
      )}

      {/* Step 4 */}
      {step===4 && (
        <section className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-gray-200">
          <h2 className="text-lg font-medium text-nhs-dark">4) Pay & Generate</h2>
          <p className="text-sm text-gray-600">Stripe test mode is supported. For demo here, we simulate payment & processing.</p>
          <div className="mt-3 flex gap-3 justify-end">
            <button className="px-4 py-2 rounded border" onClick={()=>setStep(3)}>Back</button>
            <button className="px-4 py-2 bg-nhs-blue text-white rounded" onClick={dummyPayAndRun}>Pay & Run</button>
          </div>
        </section>
      )}

      <WaitOverlay visible={showOverlay} progress={progress} />
    </main>
  );
}
