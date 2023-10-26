import React from "react";
import Link from "next/link";
import { formatDateAndTime, formatDateToDDMMYYYY } from "@/app/utils/helper";
import EnvAPI from "@/app/lib/EnvAPI";

export const dynamic = "force-dynamic";

export default async function TripDetails({ params }) {
  const vehicleId = params["vehicleId"];
  const tripDetails = params["trip-details"];

  const envUrl = EnvAPI();

  const getEntireTripDetails = await fetch(
    `${envUrl}/api/trip-data?tripId=${tripDetails}`,
    {
      cache: "no-store",
    }
  );
  const response = await getEntireTripDetails.json();

  return (
    <div className="m-4 sm:m-8">
      <Link
        href={`/vehicles/${vehicleId}`}
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
        <div>
          <p className="text-lg font-semibold text-gray-700">{vehicleId}</p>
          <p className="text-sm font-semibold text-gray-500">
            {response.trip_details.trip_type}
            {response.trip_details.no_of_trips > 1 ? (
              <> - {response.trip_details.no_of_trips} </>
            ) : (
              ""
            )}
            | {formatDateAndTime(response.trip_details.trip_date)}
          </p>
        </div>
        {!response.trip_details.submit_status && (
          <Link
            href={{
              pathname: `/vehicles/${vehicleId}/${tripDetails}/add-details`,
              query: { date: response.trip_details.trip_date },
            }}
            className="relative cursor-pointer bg-purple-100 px-2 py-0.5 
          mb-1 text-sm font-semibold text-indigo-500 rounded-sm hover:bg-purple-200"
          >
            Submit Trip
          </Link>
        )}
      </div>

      <div className="max-w-md mx-auto">
        {response.trip_metrics.map((data, index) => (
          <div
            key={index}
            className="mb-4 w-full text-gray-600 font-medium flex flex-row"
          >
            <span className=" basis-1/2">{data.label}</span>
            <span className=" text-center basis-1/6">:</span>
            <span className="text-left basis-3/4">{data.value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between mt-6 mb-4 border-b">
          <p className="text-lg text-gray-700 font-semibold pb-2">
            ORDER DETAILS
          </p>
          {response.trip_details.no_of_trips !== response.orders.length && (
            <Link
              href={{
                pathname: `/vehicles/${vehicleId}/${tripDetails}/add-order`,
              }}
              className="relative cursor-pointer bg-purple-100 px-2 py-0.5 
          mb-1 text-sm font-semibold text-indigo-500 rounded-sm hover:bg-purple-200"
            >
              Add Order
            </Link>
          )}
        </div>
        {response.orders.length > 0 ? (
          <div className="mt-2 grid grid-cols-3 gap-3 overflow-y-auto">
            {response.orders.map((order) => (
              <Link
                key={order.id}
                href={{
                  pathname: `/vehicles/${vehicleId}/${tripDetails}/order-details`,
                  query: {
                    key: order.id,
                    "trip-type": response.trip_details.trip_type,
                  },
                }}
                className="py-1 border-2 border-gray-600 text-gray-600 text-center rounded-md 
                font-semibold cursor-pointer hover:border-indigo-500 hover:text-indigo-500"
              >
                {formatDateToDDMMYYYY(order.date.split("T")[0])}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center bg-pink-300">{` Trip doesn't have any order history`}</p>
        )}
      </div>
    </div>
  );
}
