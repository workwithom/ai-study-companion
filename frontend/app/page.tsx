import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          AI Study Companion
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          An AI-powered study assistant that helps you understand topics,
          prepare for exams, revise efficiently, and practice interview-ready
          answers — all in one place.
        </p>

        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
          <li>Explain complex topics in simple terms</li>
          <li>Generate exam-oriented answers</li>
          <li>Create quick revision notes</li>
          <li>Prepare interview questions & answers</li>
          <li>Save and revisit your study sessions</li>
        </ul>

        <div className="pt-6">
          <Link
            href="/study"
            className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-zinc-800 transition"
          >
            🚀 Start Studying
          </Link>
        </div>
      </section>
    </main>
  );
}
