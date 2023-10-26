"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <h1 className="text-xl mb-2">Welcome to VK Traders</h1>
      <button
        onClick={() => router.push("/vehicles")}
        className="bg-indigo-500 p-2 rounded-md text-white hover:bg-indigo-600"
      >
        Open App
      </button>
    </div>
  );
}
