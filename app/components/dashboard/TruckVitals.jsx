import React from "react";

import DailogVitals from "@/app/components/dashboard/DailogVitals";

import CardIcon from "@/app/components/dashboard/CardIcon";

export default function TruckVitals({
  truckVitals,
  totalExpenses,
  totalMaintenance,
  query,
}) {
  return (
    <>
      {truckVitals.map((truck, index) =>
        truck.details ? (
          <div key={index} className="cursor-pointer">
            <DailogVitals
              data={truck}
              totalExpenses={
                truck.title === "Total Expenditure"
                  ? totalExpenses
                  : totalMaintenance
              }
              query={query}
            />
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
