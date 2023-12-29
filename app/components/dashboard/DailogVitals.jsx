import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import CardIcon from "./CardIcon";

export default function DailogVitals({ data, dialogfor }) {
  return (
    <Dialog className="sm:max-w-[95%] overflow-y-auto">
      <DialogTrigger asChild>
        {dialogfor == "Vitals" ? (
          <CardIcon
            title={data.title}
            description={data.description}
            value={data.value}
            icon={data.icon}
            color={data.color}
          />
        ) : (
          <Button>Overview</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[95%] h-[98%]">
        <DialogHeader>
          <DialogTitle>{dialogfor == "Vitals" ? data.title : ""}</DialogTitle>
          {/* <DialogDescription>
            A list of all the Total expenses.
          </DialogDescription> */}
        </DialogHeader>
        {/* {dialogfor == "Vitals" ? (
          <TableVitals expenses={totalExpenses} />
        ) : (
          <TableOverview allTrips={allTripsOverview} />
        )} */}
        vehicles
      </DialogContent>
    </Dialog>
  );
}
