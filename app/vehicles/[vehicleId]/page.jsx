import React from "react";
import { cookies } from "next/headers";

import VehicleDetails from "@/app/components/VehicleDetails";
import EnvAPI from "@/lib/EnvAPI";

export const dynamic = "force-dynamic";

export default async function VehicleData(props) {
  const cookieStore = cookies();

  const envUrl = EnvAPI();

  const access_token = cookieStore.get("django-auth-access");

  // console.log("access in [vehicleid]", access);
  // console.log("django token", cookieStore.get("django-auth-access"));

  const getDetails = await fetch(
    `${envUrl}/api/vehicle-data?vehicleId=${props.params.vehicleId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token.value,
      },
    }
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
