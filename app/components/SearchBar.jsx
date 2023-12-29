"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SearchBar() {
  const [serachValue, setSearchValue] = useState("");

  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/vehicles/search?lorry=${serachValue}`);
    setSearchValue("");
  };

  return (
    <form
      className="flex items-center justify-between gap-2 w-72 sm:w-3/4 md:w-1/2"
      onSubmit={handleSearchSubmit}
    >
      <Input
        type="text"
        placeholder="Enter vehicle number"
        className="pl-1 py-2"
        value={serachValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button
        type="submit"
        className="py-2 px-3 
        sm:flex sm:items-center sm:justify-center sm:gap-2"
      >
        <span className="p-2 relative sm:p-3">
          <Image src="/search.svg" alt="search icon" fill={true} />
        </span>
        <span className="hidden sm:block sm:font-semibold">Search</span>
      </Button>
    </form>
  );
}
