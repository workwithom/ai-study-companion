import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 md:px-16 lg:px-24">
        <span className="text-sm font-medium tracking-wide text-neutral-900 dark:text-neutral-100">
          AI Study Companion
        </span>
        <Link
          href="/study"
          className="rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Start Learning
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-light leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl lg:text-6xl text-balance">
            Master any subject with AI-powered study assistance
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            We believe in the power of simplicity. Clear explanations, focused
            practice, and thoughtful guidance that helps you learn effectively.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/study"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-100 px-8 py-3 text-sm font-medium text-white dark:text-neutral-900 transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-200"
            >
              Start Studying
            </Link>
            <Link
              href="/sessions"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 px-8 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              View Sessions
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative Line */}
      <div className="mx-auto max-w-xs">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />
      </div>

      {/* Features Section */}
      <section className="px-8 py-24 md:px-16 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800">
                <svg
                  className="h-5 w-5 text-neutral-600 dark:text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Clear Explanations
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Complex topics broken down into simple, understandable concepts.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800">
                <svg
                  className="h-5 w-5 text-neutral-600 dark:text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                AI-Powered
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Intelligent assistance that adapts to your learning style.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800">
                <svg
                  className="h-5 w-5 text-neutral-600 dark:text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Track Progress
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Save your sessions and revisit your learning journey anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
