import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-3 shadow-xl">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="text-sm font-medium">Minimal</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-xs text-gray-300">
            <Link href="#" className="hover:text-white">Work</Link>
            <Link href="#" className="hover:text-white">Studio</Link>
            <Link href="#" className="hover:text-white">Process</Link>
            <Link href="#" className="hover:text-white">Journal</Link>
            <Link href="#" className="hover:text-white">Contact</Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/study"
              className="bg-white text-black text-xs font-medium px-4 py-1.5 rounded-full hover:bg-gray-200"
            >
              Start Studying
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
