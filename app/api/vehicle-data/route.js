import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("vehicleId");

  const getVehicleData = await prisma.vehicle.findUnique({
    where: { registration_number: id },
    select: {
      company: true,
      chassis_number: true,
      insurance: true,
      fc: true,
      rc: true,
      status: true,
    },
  });

  const getVehicleTripDates = await prisma.trip.findMany({
    where: { vehicle_id: id },
    select: { id: true, trip_date: true, no_of_trips: true },
    orderBy: { trip_date: "asc" },
  });

  // console.log(getVehicleData, getVehicleTripDates);

  return NextResponse.json({
    vehicle_details: getVehicleData,
    trip_dates: getVehicleTripDates,
  });
}
