export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F8FC]">
      {/* Top bar (simplu) */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-[#005EB8]">MedApply</div>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/" className="text-[#425563] hover:underline">Home</a>
          <a href="/apply" className="text-[#425563] hover:underline">How it works</a>
          <a
            href="/apply"
            className="rounded-md border border-[#0072CE] px-3 py-1.5 font-medium text-[#0072CE] hover:bg-[#E6F0FA]"
          >
            START Example Statement
          </a>
          <a
            href="/apply"
            className="rounded-md bg-[#005EB8] px-3.5 py-1.5 font-medium text-white hover:bg-[#0072CE]"
          >
            See Examples
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-8 rounded-2xl bg-gradient-to-br from-[#E6F0FA] to-white p-8 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-[#003087]">
              MedApply: Accelerate Your NHS Career
            </h1>
            <p className="mt-3 max-w-xl text-[#425563]">
              AI-powered Personal Statement Builder — aligned with NHS Band roles.
            </p>
            <a
              href="/apply"
              className="mt-6 inline-block rounded-full bg-[#005EB8] px-6 py-3 text-white shadow hover:bg-[#0072CE]"
            >
              START YOUR STATEMENT
            </a>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 -z-10 rotate-2 rounded-3xl bg-[#DCEAF8]" />
            <img
              src="/hero-nhs.jpg"
              alt="NHS team in corridor"
              className="w-full rounded-3xl border border-[#D0E2F5] object-cover shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Path to Success */}
      <section className="mx-auto mt-10 max-w-6xl grid gap-8 px-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-xl font-semibold text-[#003087]">Your Path to Success</h2>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#E6F0FA]">
                🔎
              </div>
              <div className="mt-2 text-sm font-medium text-[#003087]">EXPLORE</div>
              <p className="text-xs text-[#425563]">Explore NHS roles and job descriptions</p>
            </div>
            <div className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#E6F0FA]">
                🧠
              </div>
              <div className="mt-2 text-sm font-medium text-[#003087]">TRAIN</div>
              <p className="text-xs text-[#425563]">Guided questions & examples</p>
            </div>
            <div className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#E6F0FA]">
                🤝
              </div>
              <div className="mt-2 text-sm font-medium text-[#003087]">CONNECT</div>
              <p className="text-xs text-[#425563]">Align to NHS Band competencies</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="text-xl font-semibold text-[#003087]">How It Works</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#425563]">
            <li className="flex gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E6F0FA] font-semibold text-[#003087]">1</span>
              Enter your experience & skills
            </li>
            <li className="flex gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E6F0FA] font-semibold text-[#003087]">2</span>
              Select job from catalogue or paste NHS Jobs URL
            </li>
            <li className="flex gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E6F0FA] font-semibold text-[#003087]">3</span>
              Generate statement (preview first)
            </li>
            <li className="flex gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E6F0FA] font-semibold text-[#003087]">4</span>
              Pay & receive by email
            </li>
          </ol>

          <div className="mt-5 rounded-xl bg-[#F2F7FD] p-4 text-sm text-[#003087]">
            “It saved me hours of writing — got invited soon after!”
            <div className="text-xs text-[#425563]">— Band 5 Nurse, Birmingham</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 bg-[#003087] py-6 text-sm text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <p className="opacity-80">
            MedApply.uk is an independent AI tool designed to assist NHS candidates.
          </p>
          <div className="flex gap-4 opacity-90">
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/refunds" className="hover:underline">Refund Policy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
