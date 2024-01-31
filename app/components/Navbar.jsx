"use client";
import Link from "next/link";
import { useContext, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import AuthContext from "../context/AuthContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { user, logOutUser } = useContext(AuthContext);

  console.log("user", user);

  const pathname = usePathname();

  return (
    <nav className="shadow-sm mx-auto max-w-8xl py-1 sm:px-6 lg:px-8 h-14 bg-background sticky top-0 z-50 border border-b-1">
      <div
        className={`flex items-center ${
          user ? "justify-between" : "justify-center"
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
          {user && user.is_superuser && pathname.includes("/vehicles") && (
            <Link href="/application/Overview">Overview</Link>
          )}
        </div>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 rounded-full cursor-pointer">
                <AvatarFallback className="text-primary">
                  {user.first_name && user.first_name[0]}
                  {user.last_name && user.last_name.at(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.username}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem onClick={logOutUser}>
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
  );
}
