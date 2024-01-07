import React from "react";
import Link from "next/link";
import {
  color,
  formatDateToDDMMYYYY,
  formatISODatetoDDMMYYY,
} from "../utils/helper";
import { Button } from "./ui/button";

export default function VehicleDetails({ vehicleId, vehicleData, trips }) {
  return (
    <div className="m-4 sm:m-8 w-full h-screen">
      <Link
        href="/vehicles"
        className="flex items-center justify-start w-[70px] gap-1 p-1 mb-2 sm:mb-0
        hover:cursor-pointer hover:text-primary hover:bg-primary-foreground rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span>Back</span>
      </Link>

      <div className="max-w-md mx-auto">
        <div className="mb-4 border-b">
          <p className="text-lg font-semibold text-gray-700">{vehicleId}</p>
          <p className={`font-semibold ${color(vehicleData.status)}`}>
            {vehicleData.status}
          </p>
        </div>
        <div className="mb-4 w-full text-gray-600 font-medium flex flex-row">
          <span className=" basis-1/2">Company</span>
          <span className=" text-center basis-1/6">:</span>
          <span className="text-left basis-3/4">{vehicleData.company}</span>
        </div>

        <div className="mb-4 w-full text-gray-600 font-medium flex flex-row">
          <span className=" basis-1/2">Chassis Number</span>
          <span className=" text-center basis-1/6">:</span>
          <span className="text-left basis-3/4">
            {vehicleData.chassis_number}
          </span>
        </div>
        <div className="mb-4 w-full text-gray-600 font-medium flex flex-row">
          <span className=" basis-1/2">Insurance</span>
          <span className=" text-center basis-1/6">:</span>
          <span className="text-left basis-3/4">
            {formatISODatetoDDMMYYY(vehicleData.insurance)}
          </span>
        </div>
        <div className="mb-4 w-full text-gray-600 font-medium flex flex-row">
          <span className=" basis-1/2">RC</span>
          <span className=" text-center basis-1/6">:</span>
          <span className="text-left basis-3/4">
            {formatISODatetoDDMMYYY(vehicleData.rc)}
          </span>
        </div>
        <div className="mb-4 w-full text-gray-600 font-medium flex flex-row">
          <span className=" basis-1/2">FC</span>
          <span className=" text-center basis-1/6">:</span>
          <span className="text-left basis-3/4">
            {formatISODatetoDDMMYYY(vehicleData.fc)}
          </span>
        </div>
        <div className="mt-6 mb-4 border-b">
          <p className="text-lg text-gray-700 font-semibold pb-2">
            TRIP HISTORY
          </p>
        </div>
        {trips.length > 0 ? (
          <div className="mt-2 grid grid-cols-3 gap-3 overflow-y-auto">
            {trips.map((data, index) => (
              <Button
                variant="outline"
                key={index}
                className="hover:text-primary hover:border-primary border-2"
              >
                <Link
                  href={{
                    pathname: `/vehicles/${vehicleId}/${data.id}`,
                  }}
                  className={`py-1 text-center font-semibold`}
                >
                  {formatDateToDDMMYYYY(data["trip_date"].split("T")[0])}
                </Link>
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-center bg-pink-300">
            {`Vehicle doesn't have any trip history`}
          </p>
        )}
      </div>
    </div>
  );
}
