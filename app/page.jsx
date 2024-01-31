"use client";
import React, { useContext } from "react";
// import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { Button } from "./components/ui/button";
import AuthContext from "./context/AuthContext";

export default function Home() {
  // const router = useRouter();

  const { user } = useContext(AuthContext);

  console.log("user in home page", user);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-xl mb-2">Welcome to VK Traders</h1>
        {/* <OpenApp /> */}

        {user ? (
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
