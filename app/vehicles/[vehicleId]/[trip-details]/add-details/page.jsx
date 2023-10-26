import React from "react";
import Link from "next/link";
import { formatDateAndTime } from "@/app/utils/helper";
import SubmitTrip from "@/app/components/SubmitTrip";

export default function AddDetails({ params, searchParams }) {
  const vehicleId = params["vehicleId"];
  const tripId = params["trip-details"];
  const date = searchParams["date"];

  return (
    <div className="m-4 sm:m-8">
      <Link
        href={{
          pathname: `/vehicles/${vehicleId}/${tripId}`,
          query: { date: date },
        }}
        className="flex items-center justify-start w-[72px] gap-1 p-1
        hover:cursor-pointer hover:bg-purple-100 hover:text-indigo-500"
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
      <div className="my-4 border-b flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-700">TRIP CHARGES</p>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-500 md:text-base md:font-medium">
            {vehicleId}
          </p>
          <p className="text-sm font-semibold text-gray-500 md:text-base md:font-medium">
            {formatDateAndTime(date)}
          </p>
        </div>
      </div>
      <SubmitTrip vehicleId={vehicleId} date={date} tripId={tripId} />
    </div>
  );
}
