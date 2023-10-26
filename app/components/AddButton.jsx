import Link from "next/link";

export default function Addbutton() {
  return (
    <div className="relative">
      <Link
        className="fixed bottom-4 right-4 p-2 rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-600"
        href="/new-trip"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 md:w-6 md:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
    </div>
  );
}
