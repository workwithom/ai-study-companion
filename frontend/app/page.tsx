export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 text-center">
      {/* Glow */}
      <div className="absolute w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full" />

      <section className="relative z-10 max-w-4xl space-y-8">
        <span className="inline-block px-3 py-1 text-xs bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
          AI Study Companion
        </span>

        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight">
          Crafting focused learning experiences with AI
        </h1>

        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
          Explain concepts, prepare for exams, revise efficiently, and practice
          interview answers — all with minimalist AI guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <a
            href="/study"
            className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition shadow-lg"
          >
            Start Studying
          </a>

          <a
            href="/sessions"
            className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition"
          >
            View Sessions
          </a>
        </div>

        {/* Mock App Window */}
        <div className="pt-20 flex justify-center">
          <div className="w-[768px] h-[400px] bg-black/40 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden">
            <div className="h-8 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 bg-white/30 rounded-full" />
              <div className="w-3 h-3 bg-white/30 rounded-full" />
              <div className="w-3 h-3 bg-white/30 rounded-full" />
            </div>
            <div className="p-6 text-white/50 text-sm">
              Your AI study workspace lives here.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
