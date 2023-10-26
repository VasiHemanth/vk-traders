import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";

export async function GET(request) {
  const allVehicles = await prisma.vehicle.findMany({
    select: {
      id: true,
      registration_number: true,
      company: true,
      driver_name: true,
      status: true,
    },
    orderBy: { id: "asc" },
  });

  const vehicles = allVehicles.map((vehicle) => {
    return { ...vehicle, id: vehicle.id.toString() };
  });

  return NextResponse.json(vehicles);
}
