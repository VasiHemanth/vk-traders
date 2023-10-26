import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";

export async function GET(request){
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search-string");

    const foundVehicles = await prisma.vehicle.findMany({
        where: {
            registration_number: {
                contains: search
            }
        },
        select: {
          id: true,
          registration_number: true,
          company: true,
          driver_name: true,
          status: true,
        }
      });
    
      const vehicles = foundVehicles.map((vehicle) => {
        return { ...vehicle, id: vehicle.id.toString() };
      });

      return NextResponse.json(vehicles)
}