import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";
import { numberWithCommas } from "@/app/utils/helper";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  const getOrderDetails = await prisma.order.findFirst({
    where: { id: orderId },
    select: {
      date: true,
      order_id: true,
      from: true,
      to: true,
      grade: true,
      quantity: true,
      party_name: true,
      advance: true,
      loading: true,
      unloading: true,
      toll_gate: true,
      rto_pcl: true,
      total_expenses: true,
      freight: true,
      freight_amount: true,
      driver_freight: true,
      driver_amount: true,
      submit_status: true,
    },
  });

  let orderDetails;
  if (getOrderDetails.submit_status) {
    orderDetails = [
      { label: "From", value: getOrderDetails.from },
      { label: "To", value: getOrderDetails.to },
      { label: "Grade", value: getOrderDetails.grade },
      { label: "Quantity", value: String(getOrderDetails.quantity) + " tons" },
      { label: "Shipment Number", value: getOrderDetails.order_id },
      { label: "Party Name", value: getOrderDetails.party_name },
      {
        label: "Advance",
        value: "₹" + numberWithCommas(getOrderDetails.advance),
      },
      { label: "Loading", value: "₹" + numberWithCommas(getOrderDetails.loading) },
      { label: "UnLoading", value: "₹" + numberWithCommas(getOrderDetails.unloading) },
      { label: "Toll Gate", value: "₹" + numberWithCommas(getOrderDetails.toll_gate) },
      { label: "RTO & PC", value: "₹" + numberWithCommas(getOrderDetails.rto_pcl) },
      { label: "Freight", value: "₹" + numberWithCommas(getOrderDetails.freight) },
      { label: "Expenses", value: "₹" + numberWithCommas(getOrderDetails.total_expenses) },
      { label: "Freight Amount", value: "₹" + numberWithCommas(getOrderDetails.freight_amount) },
      { label: "Driver Freight", value: "₹" + numberWithCommas(getOrderDetails.driver_freight) },
      { label: "Driver Amount", value: "₹" + numberWithCommas(getOrderDetails.driver_amount) },
    ];
  } else {
    orderDetails = [
      { label: "From", value: getOrderDetails.from },
      { label: "To", value: getOrderDetails.to },
      { label: "Grade", value: getOrderDetails.grade },
      { label: "Quantity", value: String(getOrderDetails.quantity) + " tons" },
      { label: "Shipment Number", value: getOrderDetails.order_id },
      { label: "Party Name", value: getOrderDetails.party_name },
      {
        label: "Advance",
        value: "₹" + numberWithCommas(getOrderDetails.advance),
      },
    ];
  }

  return NextResponse.json({
    order_date: getOrderDetails.date,
    order_submit_status: getOrderDetails.submit_status,
    order_data: orderDetails,
  });
}
