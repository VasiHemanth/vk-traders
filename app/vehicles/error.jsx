"use client";

import React, { useContext } from "react";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import AuthContext from "../context/AuthContext";

export default function Error({ error }) {
  const router = useRouter();
  console.error("error object", error);

  const { logOutUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center p-2 w-full h-[80%] bg-gray-200">
      <p>Something went wrong. An error occured while fetching the data.</p>
      <div className="pt-5">
        <Button className="mr-2" onClick={() => router.reload()}>
          Try Again
        </Button>
        <Button onClick={logOutUser}>Go Back</Button>
      </div>
    </div>
  );
}
