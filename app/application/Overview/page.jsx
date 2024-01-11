"use client";

import React, { useContext, useState } from "react";

import ChartCard from "@/app/components/dashboard/ChartCard";
import VehicleMonthSelector from "@/app/components/dashboard/VehicleMonthSelector";

import CardRecent from "@/app/components/dashboard/CardRecent";
import EnvAPI from "@/lib/EnvAPI";
import TruckVitals from "@/app/components/dashboard/TruckVitals";
import AuthContext from "@/app/context/AuthContext";

export default function Overview() {
  const [overview, setOverview] = useState({
    vitalsData: [],
    recentDeliveries: [],
    fetched: false,
  });

  const [chartData, setChartData] = useState(null);

  const [query, setQuery] = useState(null);

  const url = EnvAPI();

  const { AuthTokens } = useContext(AuthContext);

  const handleChartDataColumn = async (column, monthYear, vehicle) => {
    const getChartData = await fetch(
      `${url}/api/chart-data?source=${column}&truck_id=${vehicle}&monthYear=${monthYear}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthTokens.access,
        },
      }
    );

    const chartDataResponse = await getChartData.json();
    setChartData(chartDataResponse);
  };

  const handleVehicleMonthSelection = async (monthYear, vehicle) => {
    setOverview({
      ...overview,
      vitalsData: [],
      recentDeliveries: [],
      fetched: false,
    });

    setQuery({
      monthYear: monthYear,
      vehicle: vehicle,
    });

    const overivewVitalsRecentDeliveries = await fetch(
      `${url}/api/truck-vitals?truck_id=${vehicle}&monthYear=${monthYear}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthTokens.access,
        },
      }
    );
    const overviewResponse = await overivewVitalsRecentDeliveries.json();

    handleChartDataColumn("quantity", monthYear, vehicle);

    setOverview({
      ...overview,
      fetched: true,
      vitalsData: overviewResponse[0],
      recentDeliveries: overviewResponse[1],
    });

    return overivewVitalsRecentDeliveries.ok;
  };

  console.log("overview", overview, "chart data", chartData);
  return (
    <div className=" p-1 pb-2">
      <div
        className="flex flex-col items-start justify-center 
      sm:flex-row sm:items-center  sm:justify-between mb-1"
      >
        <p className="text-primary text-xl font-semibold lg:text-2xl">
          Trucks Overview
        </p>
        <div className="flex flex-col w-full sm:flex-row sm:w-auto gap-1 ">
          <VehicleMonthSelector
            vehicle={"Truck"}
            handleVehicleMonthSelection={handleVehicleMonthSelection}
          />
          {/* <DailogVitals data={""} dialogfor={"Overview"} /> */}
        </div>
      </div>
      {overview.fetched && (
        <>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 py-3">
            {overview.vitalsData.length != 0 && (
              <TruckVitals truckVitals={overview.vitalsData} />
            )}
          </div>
          <div className="flex flex-col xl:flex-row gap-2 max-h-[20%] ">
            <div className="w-full xl:w-3/5">
              {chartData != null && (
                <ChartCard
                  chartData={chartData}
                  handleChartDataColumn={handleChartDataColumn}
                  query={query}
                />
              )}
            </div>
            <div className="w-full xl:w-2/5">
              <CardRecent recentData={overview.recentDeliveries} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
