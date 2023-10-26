import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";

export async function GET(request) {
  const getVehicles = await prisma.vehicle.findMany({
    where: { status: "Stable" },
    select: { registration_number: true },
  });

  const vehicles = getVehicles.map((vehicle) => {
    return {
      label: vehicle.registration_number,
      value: vehicle.registration_number,
    };
  });
  return NextResponse.json(vehicles);
}

export async function POST(request) {
  let body = await request.json();
  const insertTrip = await prisma.trip.create({
    data: {
      trip_date: body.date,
      trip_type: body.tripType.value,
      no_of_trips: Number(body.Trips),
      vehicle_id: body.selectedVehicle.value,
      owner_name: body.ownerName,
    },
  });

  return NextResponse.json(insertTrip);
}
