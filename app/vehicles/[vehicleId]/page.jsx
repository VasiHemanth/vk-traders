"use client";

import React, { useEffect, useState } from "react";

import VehicleDetails from "@/app/components/VehicleDetails";
import EnvAPI from "@/lib/EnvAPI";

import Loader from "@/app/components/Loader";
import { useSession } from "next-auth/react";

export default function VehicleData(props) {
  const [vehicleData, setVehicleData] = useState({
    vehicleDetails: [],
    trips: [],
    loader: false,
  });
  const envUrl = EnvAPI();
  const { data } = useSession();

  const getVehicleData = async (params) => {
    setVehicleData({
      ...vehicleData,
      vehicleDetails: [],
      trips: [],
      monthYear: "",
      loader: true,
    });

    let url = `${envUrl}/api/vehicle-data?vehicleId=${props.params.vehicleId}`;

    if (params !== undefined) {
      url += `&monthYear=${params}`;
    }

    const getDetails = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.user.access_token,
      },
    });
    const response = await getDetails.json();
    setVehicleData({
      ...vehicleData,
      vehicleDetails: response.vehicle_details,
      trips: response.trip_dates,
      monthYear: response.month_year,
      loader: false,
    });
  };

  useEffect(() => {
    getVehicleData();
  }, []);

  // const vehicleDetails = response.vehicle_details;
  // const trips = response.trip_dates;

  return (
    <div className="flex items-center justify-center">
      {vehicleData.loader ? (
        <div className="w-full">
          <Loader />
        </div>
      ) : (
        <VehicleDetails
          vehicleId={props.params.vehicleId}
          vehicleData={vehicleData.vehicleDetails}
          monthYear={vehicleData.monthYear}
          trips={vehicleData.trips}
          getVehicleData={getVehicleData}
          user={data.user}
        />
      )}
    </div>
  );
}
