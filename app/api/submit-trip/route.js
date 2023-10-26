import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";

const getOrderData = async(orderId)=> {
    const orderData = await prisma.order.findFirst({
        where: {
            id: orderId,
        },
        select: {
            total_expenses: true,
            freight_amount:true,
            driver_amount: true,
        }
    })
    return parseFloat(orderData.freight_amount - orderData.total_expenses - orderData.driver_amount)
}

export async function POST(request){
    let body = await request.json()

    const getOrderIds = await prisma.order_to_trip_mapping.findMany({
        where:{
            trip_id: body.tripId,
        },
        select: {
            order_id: true
        }
    })

    let amount = 0;
    const promises = getOrderIds.map((data) => {
        console.log("Related Orders")
        return getOrderData(data.order_id);
    });
      
    Promise.all(promises).then((expenses) => {
        expenses.forEach((expense) => {
            console.log("Multi Order Expense frieght", expense)
          amount += expense;
        });

        console.log("Amount", amount),
        console.log("DieselAmount", parseFloat(body.trip_data.dieselAmount))
        console.log("AdBlue", parseInt(body.trip_data.adBlue))
        console.log("balance Amount", amount - body.trip_data.dieselAmount - body.trip_data.adBlue);

        return prisma.trip.update({
            where: {
                id: body.tripId,
            },
            data: {
                reading: parseInt(body.trip_data.reading),
                kilometers: parseInt(body.trip_data.tripDistance),
                diesel: parseFloat(body.trip_data.dieselLitres),
                diesel_per_litre: parseFloat(body.trip_data.dieselPerLitre),
                diesel_amount: parseFloat(body.trip_data.dieselAmount),
                mileage: parseFloat(body.trip_data.mileage),
                ad_blue: parseFloat(body.trip_data.adBlue),
                balance_amount: (amount - parseFloat(body.trip_data.dieselAmount) - parseInt(body.trip_data.adBlue)),
                submit_status: true
            }
        })
      }).then((getTripDetails) => {
        console.log(getTripDetails)
      }).catch((error)=>{
        console.log("Error", error)
      })
      
    return NextResponse.json({"message": "inserted Succussfully"})
}

// export async function GET(request){
    
// }

