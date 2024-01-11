import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

import LineChartTo from "./LineChartTo";
import ButtonLoader from "../ButtonLoader";

export default function ChartCard({ handleChartDataColumn, chartData, query }) {
  const [chartColumn, setChartColumn] = useState({
    loading: false,
    column: "quantity",
  });

  const handleChange = async (e) => {
    setChartColumn({ ...chartColumn, column: e, loading: true });
    const okChart = await handleChartDataColumn(
      e,
      query.monthYear,
      query.vehicle
    );

    if (okChart) {
      setChartColumn({ ...chartColumn, loading: false });
    }
  };

  return (
    <Card className="flex flex-col lg:min-h-full 2xl:min-h-3/4">
      <CardHeader className="flex flex-row items-center justify-between px-8 pt-4 ">
        <div>
          <CardTitle className="text-sm xl:text-base font-medium">
            Overview
          </CardTitle>
          <CardDescription className="text-[13px]">
            last 6 months data
          </CardDescription>
        </div>
        {/* <Image src={icon} width={20} height={20} alt={title + "icon"} /> */}
        <div className="w-auto">
          <Select onValueChange={(e) => handleChange(e)}>
            <SelectTrigger>
              <SelectValue placeholder="Quantity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quantity">Quantity</SelectItem>
              <SelectItem value="maintanance">Maintanance</SelectItem>
              <SelectItem value="balance_amount">Balance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {chartColumn.loading ? (
          <div className="w-full h-56 grid place-items-center">
            <ButtonLoader />
          </div>
        ) : (
          <LineChartTo chartData={chartData} />
        )}
      </CardContent>
    </Card>
  );
}
