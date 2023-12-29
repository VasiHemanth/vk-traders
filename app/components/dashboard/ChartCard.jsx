import React from "react";

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

const items = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

export default function ChartCard() {
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
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="quantity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quantity">Quantity</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="balance">Balance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <LineChartTo />
      </CardContent>
    </Card>
  );
}
