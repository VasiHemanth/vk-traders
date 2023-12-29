import React from "react";

import DailogVitals from "@/app/components/dashboard/DailogVitals";

import CardIcon from "@/app/components/dashboard/CardIcon";

export default function TruckVitals({ truckVitals }) {
  return (
    <>
      {truckVitals.map((truck, index) =>
        truck.details ? (
          <div
            key={index}
            className="cursor-pointer hover:border-2 hover:border-primary hover:rounded-2xl"
          >
            <DailogVitals data={truck} dialogfor={"Vitals"} />
          </div>
        ) : (
          <CardIcon
            title={truck.title}
            description={truck.description}
            value={truck.value}
            icon={truck.icon}
            color={truck.color}
            key={index}
          />
        )
      )}
    </>
  );
}
