import AddServiceDialog from "@/app/components/maintenanace/AddServiceDialog";
import ServiceAccordian from "@/app/components/maintenanace/ServiceAccordian";
import EnvAPI from "@/lib/EnvAPI";

import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default async function Maintanance(props) {
  const url = EnvAPI();

  const get_maintenance_data = await fetch(
    `${url}/api/maintenance-data?vehicle_id=${props.params.vehicleId}`
  );

  const maintenance_dates = await get_maintenance_data.json();

  return (
    <div className="flex items-center justify-center">
      <div className="m-4 sm:m-8 w-full h-screen">
        <Link
          href={`/vehicles/${props.params.vehicleId}`}
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
          <div className="mb-4 border-b flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">{props.params.vehicleId}</p>
              <p className="text-sm text-muted-foreground">
                Detailed log of maintenance activites
              </p>
            </div>
            <AddServiceDialog vehicle_id={props.params.vehicleId} />
          </div>
          <ServiceAccordian maintenance={maintenance_dates} />
        </div>
      </div>
    </div>
  );
}
