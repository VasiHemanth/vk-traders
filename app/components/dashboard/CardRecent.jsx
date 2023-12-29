import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { numberWithCommas } from "@/app/utils/helper";

export default function CardRecent({ recentData }) {
  return (
    <Card className="h-[400px] lg:min-h-full 2xl:h-3/4 overflow-y-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sticky top-0 bg-background">
        <div className="flex flex-col">
          <CardTitle className="text-sm font-medium">
            Recent Deliveries
          </CardTitle>
          <CardDescription>
            {recentData.length} deliveries in this month
          </CardDescription>
        </div>
        <Image src="/delivery.svg" width={20} height={20} alt="Delivery icon" />
      </CardHeader>
      <CardContent>
        {recentData.map((data, index) => (
          <div key={index} className="py-2">
            <div className="text-sm font-semibold">
              {data.from} - {data.to}
            </div>
            <p className="text-xs text-muted-foreground">
              {data.order_date.split("T")[0]} | Frieght{" "}
              {numberWithCommas(data.frieght)} | Qty {data.quantity}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
