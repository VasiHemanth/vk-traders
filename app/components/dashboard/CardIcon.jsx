import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

import { numberWithCommas } from "@/app/utils/helper";

export default function CardIcon({ title, icon, value, description, color }) {
  const formatVitalValue = (value, title) => {
    let returnValue;
    const vitals = ["Quantity", "Kilometers"];
    if (vitals.includes(title)) {
      if (title === vitals[0]) {
        returnValue = numberWithCommas(value) + " tons";
      } else {
        returnValue = value != "" ? numberWithCommas(value) : "NA";
      }
    } else {
      returnValue = value != "" ? "₹" + numberWithCommas(value) : "NA";
    }
    return returnValue;
  };

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between px-3 pt-4 pb-1">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Image src={icon} width={20} height={20} alt={title + "icon"} />
      </CardHeader>
      <CardContent className="px-3 space-y-0">
        <div
          className={`lg:text-lg xl:text-xl font-bold
          ${
            color === "red"
              ? "text-red-600"
              : color === "yellow"
              ? "text-[#FFD300]"
              : ""
          }
        `}
        >
          {formatVitalValue(value, title)}
        </div>
        <p className="text-xs text-muted-foreground">
          {title == "Balance" ? (
            <> GST Balance ₹{numberWithCommas(description)}</>
          ) : (
            description
          )}
        </p>
      </CardContent>
    </Card>
  );
}
