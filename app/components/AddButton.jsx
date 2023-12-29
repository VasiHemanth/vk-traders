import Link from "next/link";
import { Button } from "./ui/button";

export default function Addbutton() {
  return (
    <div className="relative">
      <Button
        asChild
        className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg"
      >
        <Link href="/new-trip">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>{" "}
          New Trip
        </Link>
      </Button>
    </div>
  );
}
