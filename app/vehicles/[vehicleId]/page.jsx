import React from "react";

import VehicleDetails from "@/app/components/VehicleDetails";
import EnvAPI from "@/app/lib/EnvAPI";

export const dynamic = "force-dynamic";

export default async function VehicleData(props) {
  const envUrl = EnvAPI();

  const getDetails = await fetch(
    `${envUrl}/api/vehicle-data?vehicleId=${props.params.vehicleId}`
  );
  const response = await getDetails.json();

  const vehicleDetails = response.vehicle_details;
  const trips = response.trip_dates;

  return (
    <div className="flex items-center justify-center">
      <VehicleDetails
        vehicleId={props.params.vehicleId}
        vehicleData={vehicleDetails}
        trips={trips}
      />
    </div>
  );
}
