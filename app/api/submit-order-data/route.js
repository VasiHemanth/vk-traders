import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const orderId = searchParams.get("key")

    const getOrder = await prisma.order.findFirst({
        where: {
            id: orderId,
        }, select: {
            quantity: true
        }
    })

    return NextResponse.json(getOrder)
}

export async function POST(request){
    let body = await request.json()
    const updateOrder = await prisma.order.update({
        where: {id: body.id},
        data:{
            loading: parseInt(body.order_data.loading),
            unloading:parseInt(body.order_data.unloading),
            toll_gate:parseInt(body.order_data.tollGate),
            rto_pcl: parseInt(body.order_data.pclRto),
            total_expenses:parseInt(body.order_data.totalExpenses),
            freight: parseInt(body.order_data.freight),
            freight_amount:body.order_data.freightAmount,
            driver_freight:parseInt(body.order_data.driverFreight),
            driver_amount: parseInt(body.order_data.driverAmount),
            submit_status: true,
            updated_at: new Date().toISOString()
        }
    })


    return NextResponse.json(updateOrder)
}