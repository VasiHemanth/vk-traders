import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export default function VehicleDropdownMenu({ vehicleId, user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Image src="/delivery.svg" alt="delivery" width={22} height={22} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>My Vehicle</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.is_superuser && (
            <DropdownMenuItem>
              <Link
                href={{
                  pathname: `/vehicles/${vehicleId}/emi`,
                }}
                className="flex items-center justify-between w-full"
              >
                EMI
                <Image
                  src="/loan.svg"
                  alt="loan"
                  width={22}
                  height={22}
                  className="pl-1"
                />
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link
              href={{
                pathname: `/vehicles/${vehicleId}/maintenance`,
              }}
              className="flex items-center justify-between w-full"
            >
              Maintenance
              <Image
                src="/maintenance.svg"
                alt="maintenance"
                width={22}
                height={22}
                className="pl-1"
              />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
