import React from "react";
import Image from "next/image";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import TableOverview from "./TableOverview";
import { formatmonthYeartoLongMonth } from "@/app/utils/helper";

export default function DialogTrips({ allTrips, query }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            title="Open Delivires"
            className="flex items-center"
          >
            Orders
            <Image
              src="/delivery.svg"
              alt="delivery"
              width={22}
              height={22}
              className="pl-1"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[97%] sm:h-[95%] 2xl:h-[75%]">
          <DialogHeader>
            <DialogTitle>Total Orders</DialogTitle>
            <DialogDescription>
              Balance sheet analysis of {query.vehicle} in{" "}
              {formatmonthYeartoLongMonth(query.monthYear)}
            </DialogDescription>
          </DialogHeader>
          <TableOverview allTrips={allTrips} />
          {/* <DialogFooter className="flex items-center justify-center !mx-auto text-muted-foreground"></DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
