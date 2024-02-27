"use client";
import React from "react";
// import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { Button } from "./components/ui/button";
import { useSession } from "next-auth/react";

export default function Home() {
  // const router = useRouter();

  const { data } = useSession();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-xl mb-2">Welcome to VK Traders</h1>
        {/* <OpenApp /> */}

        {data ? (
          <Button>
            <Link href="/vehicles">Open App</Link>
          </Button>
        ) : (
          <Button>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        )}
      </div>
    </>
  );
}
