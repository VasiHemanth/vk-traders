"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./components/ui/button";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="h-screen">
      <div className="flex items-center justify-end">
        <div className="flex flex-col p-1 px-4">
          <p className="text-lg my-2">{`Don't worry`}</p>
          <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
        </div>
        <span className="border-r border-line h-28"></span>
        <div className="flex flex-col p-1 px-4">
          <p className="text-lg my-2">{`It's just a 404 error`}</p>
          <p className="text-muted-foreground text-sm">
            The page your looking <br />
            for is not available
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pb-48">
        <p className="text-[200px] font-semibold text-valuelabs drop-shadow-2xl rounded-md">
          404
        </p>
      </div>
    </div>
  );
}
