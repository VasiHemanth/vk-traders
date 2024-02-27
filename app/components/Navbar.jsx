"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "universal-cookie";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";

import Loader from "./Loader";

export default function Navbar() {
  const pathname = usePathname();
  const { data } = useSession();
  const cookies = new Cookies(null, { path: "/" });

  const handleLogout = () => {
    cookies.remove("refresh_token", { path: "/" });
    cookies.remove("access_token", { path: "/" });
    cookies.remove("username", { path: "/" });

    signOut({ callbackUrl: "/auth/signin" }).then(() =>
      console.log("logged out")
    );
  };

  console.log("data", data);

  return (
    <>
      {/* {loading && <Loader />} */}
      <nav className="shadow-sm mx-auto max-w-8xl py-1 sm:px-6 lg:px-8 h-14 bg-background sticky top-0 z-50 border border-b-1">
        <div
          className={`flex items-center ${
            data ? "justify-between" : "justify-center"
          } mx-2`}
        >
          <div className="flex items-center space-x-4 lg:space-x-6 text-foreground">
            <Link
              className="text-primary bg-white text-lg rounded 
          font-sans font-semibold cursor-pointer hover:bg-slate-50 md:text-xl"
              href="/vehicles"
            >
              <div className="relative w-24 h-11">
                <Image src="/VkTraders.png" alt="logo" fill={true} />
              </div>
            </Link>
            {pathname.includes("/application") && (
              <Link href="/vehicles">Vehicles</Link>
            )}
            {data &&
              data.user.is_superuser &&
              (pathname.includes("/vehicles") ||
                pathname.includes("/new-trip")) && (
                <Link href="/application/Overview">Overview</Link>
              )}
          </div>

          {data && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 rounded-full cursor-pointer">
                  <AvatarFallback className="text-primary">
                    {data.user.name[0].toUpperCase()}
                    {data.user.name[1].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {data.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {data.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator /> */}
                <DropdownMenuItem onClick={() => handleLogout()}>
                  <span className="flex items-center justify-between w-full">
                    Log out
                    <Image
                      src="/logout.svg"
                      alt="log-out"
                      width={22}
                      height={22}
                      className="pl-1"
                    />
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </>
  );
}
