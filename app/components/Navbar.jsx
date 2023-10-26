import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="shadow-sm mx-auto h-14 flex items-center justify-center bg-indigo-500 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8">
        <Link
          className="text-indigo-500 bg-white p-2 text-lg rounded 
          font-sans font-semibold cursor-pointer hover:bg-slate-50 md:text-xl"
          href="/vehicles"
        >
          VK <span className="tracking-wide">Traders</span>
        </Link>
      </div>
    </nav>
  );
}
