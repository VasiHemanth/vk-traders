import React from "react";
import Link from "next/link";
import { formatDateAndTime } from "@/app/utils/helper";
import SubmitOrder from "@/app/components/SubmitOrder";

export default async function SubmitOrderDetails({ params, searchParams }) {
  const vehicleId = params["vehicleId"];
  const tripDetails = params["trip-details"];
  const key = searchParams["key"];
  const tripType = searchParams["trip-type"];
  const shipmentId = searchParams["order-id"];

  return (
    <div className="m-4 sm:m-8">
      <Link
        href={{
          pathname: `/vehicles/${vehicleId}/${tripDetails}/order-details`,
          query: { key: key, "trip-type": tripType },
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
      <div className="my-4 border-b">
        <p className="text-lg font-semibold text-gray-700">ORDER EXPENSES</p>
        <p className="text-sm font-semibold text-gray-500 md:text-base md:font-medium">
          Shipment Id - {shipmentId}
        </p>
      </div>
      <SubmitOrder
        tripTypeStatus={tripType}
        orderId={key}
        tripDetails={tripDetails}
        vehicleId={vehicleId}
      />
    </div>
  );
}
