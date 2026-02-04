import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="font-semibold text-lg text-black dark:text-white"
        >
          AI Study Companion
        </Link>

        {/* Links */}
        <div className="flex gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/study"
            className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            Study
          </Link>

          <Link
            href="/sessions"
            className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            Sessions
          </Link>
        </div>
      </div>
    </nav>
  );
}
