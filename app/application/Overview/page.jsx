"use client";

import React, { useState } from "react";

import EnvAPI from "@/lib/EnvAPI";

import TruckVitals from "@/app/components/dashboard/TruckVitals";
import ChartCard from "@/app/components/dashboard/ChartCard";
import CardRecent from "@/app/components/dashboard/CardRecent";
import VehicleMonthSelector from "@/app/components/dashboard/VehicleMonthSelector";

import ButtonLoader from "@/app/components/ButtonLoader";
import { useSession } from "next-auth/react";

export default function Overview() {
  const [overview, setOverview] = useState({
    vitalsData: [],
    recentDeliveries: [],
    totalExpenditure: [],
    totalMaintenance: [],
    allTrips: [],
    fetched: false,
  });
  const [chartData, setChartData] = useState(null);
  const [query, setQuery] = useState(null);
  const url = EnvAPI();
  const { data } = useSession();

  const handleChartDataColumn = async (column, monthYear, vehicle) => {
    const getChartData = await fetch(
      `${url}/api/chart-data?source=${column}&truck_id=${vehicle}&monthYear=${monthYear}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.user.access_token,
        },
      }
    );

    const chartDataResponse = await getChartData.json();
    setChartData(chartDataResponse);
    if (getChartData.ok) {
      return true;
    }
  };

  const handleVehicleMonthSelection = async (monthYear, vehicle) => {
    setOverview({
      ...overview,
      vitalsData: [],
      recentDeliveries: [],
      totalExpenditure: [],
      totalMaintenance: [],
      allTrips: [],
      fetched: false,
    });
    setChartData(null);
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
          Authorization: "Bearer " + data.user.access_token,
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
      totalExpenditure: overviewResponse[2],
      totalMaintenance: overviewResponse[3],
      allTrips: overviewResponse[4],
    });

    return overivewVitalsRecentDeliveries.ok;
  };

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
              <TruckVitals
                truckVitals={overview.vitalsData}
                totalExpenses={overview.totalExpenditure}
                totalMaintenance={overview.totalMaintenance}
                query={query}
              />
            )}
          </div>
          <div className="flex flex-col xl:flex-row gap-2 max-h-[20%]">
            <div className="w-full xl:w-3/5 2xl:w-3/4">
              {chartData != null ? (
                <ChartCard
                  chartData={chartData}
                  handleChartDataColumn={handleChartDataColumn}
                  query={query}
                />
              ) : (
                <div className="h-60 grid place-items-center">
                  <ButtonLoader />
                </div>
              )}
            </div>
            <div className="w-full xl:w-2/5 2xl:w-1/4">
              <CardRecent
                recentData={overview.recentDeliveries}
                allTrips={overview.allTrips}
                query={query}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
