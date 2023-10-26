import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";

export async function POST(request) {
  let body = await request.json();
  const createOrder = await prisma.order.create({
    data: {
      date: body.order_data.date,
      quantity: Number(body.order_data.quantity),
      grade: body.order_data.grade,
      from: body.order_data.fromLocation,
      to: body.order_data.toLocation,
      order_id: body.order_data.shipmentNumber,
      party_name: body.order_data.partyName,
      advance: body.order_data.advance,
      submit_status: false,
    },
  });

  const mapOrderToTrip = await prisma.order_to_trip_mapping.create({
    data:{
      trip_id: body.trip_id,
      order_id: createOrder.id
    }
  })

  return NextResponse.json({
    id: mapOrderToTrip.id.toString(),
    order_id: createOrder.id,
    message: "Order Created and mapped to trip Successfully",
  });
}
