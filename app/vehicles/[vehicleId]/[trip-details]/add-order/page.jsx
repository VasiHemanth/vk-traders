import CreateOrder from "@/app/components/CreateOrder";
import React from "react";

export default async function AddOrder({ params, searchParams }) {
  const vehicleId = params["vehicleId"];
  const tripId = params["trip-details"];

  return (
    <CreateOrder
      vehicleId={vehicleId}
      tripId={tripId}
    />
  );
}
