"use client";
import React from "react";
// import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  // const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-xl mb-2">Welcome to VK Traders</h1>
        {/* <OpenApp /> */}
        <Link
          href="/auth/signin"
          className="bg-primary p-2 rounded-md text-white hover:bg-purple-600"
        >
          Open App
        </Link>
      </div>
    </>
  );
}
