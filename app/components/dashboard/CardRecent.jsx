import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatYYYYMMDDToDDMMYYYY, numberWithCommas } from "@/app/utils/helper";
import DialogTrips from "./DialogTrips";

export default function CardRecent({ recentData, allTrips, query }) {
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
        <DialogTrips allTrips={allTrips} query={query} />
      </CardHeader>
      <CardContent>
        {recentData.map((data, index) => (
          <div key={index} className="py-2">
            <div className="text-sm font-semibold">
              {data.from.toUpperCase()} - {data.to.toUpperCase()}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatYYYYMMDDToDDMMYYYY(data.order_date)} | FA{" "}
              {numberWithCommas(data.frieght)} | Qty {data.quantity}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
