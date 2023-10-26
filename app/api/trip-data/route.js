import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";
import { numberWithCommas } from "@/app/utils/helper";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get("tripId");

  const getTripDetails = await prisma.trip.findFirst({
    where: { id: tripId },
    select: {
      trip_type: true,
      no_of_trips: true,
      trip_date: true,
      reading: true,
      kilometers: true,
      diesel: true,
      diesel_amount: true,
      ad_blue: true,
      mileage: true,
      balance_amount:true,
      submit_status: true,
    },
  });
  const orderToTripMappings = await prisma.order_to_trip_mapping.findMany({
    where: { trip_id: tripId },
    select: {
      order_id: true,
    },
  });
  const getOrderIds = orderToTripMappings.map((order) => order.order_id);
  const getOrderDates = await prisma.order.findMany({
    where: {
      id: {
        in: getOrderIds,
      },
    },
    select: {
      id: true,
      date: true,
      order_id: true,
    },
  });

  return NextResponse.json({
    trip_details: {
      trip_date: getTripDetails.trip_date,
      trip_type: getTripDetails.trip_type,
      no_of_trips: getTripDetails.no_of_trips,
      submit_status: getTripDetails.submit_status
    },
    trip_metrics: [
      {
        label: "Reading",
        value: getTripDetails.reading == null ? "N/A" : getTripDetails.reading,
      },
      {
        label: "Kilometers",
        value: getTripDetails.kilometers == null ? "N/A" : getTripDetails.kilometers,
      },
      {
        label: "Diesel",
        value: getTripDetails.diesel == null ? "N/A" : getTripDetails.diesel,
      },
      {
        label: "Diesel Amount",
        value: getTripDetails.diesel_amount == null ? 
          "N/A" :  "₹" + numberWithCommas(getTripDetails.diesel_amount),
      },
      {
        label: "AdBlue",
        value: getTripDetails.ad_blue == null ? 
          "N/A" : "₹" + numberWithCommas(getTripDetails.ad_blue),
      },
      {
        label: "Mileage",
        value: getTripDetails.mileage == null ? "N/A" : getTripDetails.mileage,
      },
      {
        label: "Balance Amount",
        value: getTripDetails.balance_amount == null ? 
          "N/A" : "₹" + numberWithCommas(getTripDetails.balance_amount),
      },
    ],
    orders: getOrderDates,
  });
}
