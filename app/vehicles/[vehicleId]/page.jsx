"use client";

import React, { useContext, useEffect, useState } from "react";

import VehicleDetails from "@/app/components/VehicleDetails";
import EnvAPI from "@/lib/EnvAPI";
import AuthContext from "@/app/context/AuthContext";
import ButtonLoader from "@/app/components/ButtonLoader";
import Loader from "@/app/components/Loader";

export default function VehicleData(props) {
  const [vehicleData, setVehicleData] = useState({
    vehicleDetails: [],
    trips: [],
    loader: false,
  });

  const envUrl = EnvAPI();

  const { user, loading, AuthTokens } = useContext(AuthContext);

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
        Authorization: "Bearer " + AuthTokens.access,
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
  }, [loading]);

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
          user={user}
        />
      )}
    </div>
  );
}
