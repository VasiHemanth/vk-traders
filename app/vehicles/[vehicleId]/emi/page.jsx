import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";

import EMITable from "@/app/components/emi/EMITable";
import EnvAPI from "@/lib/EnvAPI";
import AddEMIDialog from "@/app/components/emi/AddEMIDialog";

export default async function EMI(props) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const url = EnvAPI();

  const get_emi_data = await fetch(
    `${url}/api/emi-data?vehicle_id=${props.params.vehicleId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token.value,
      },
    }
  );

  const emi_data = await get_emi_data.json();

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
                Detailed log of EMIs
              </p>
            </div>
            <AddEMIDialog vehicle_id={props.params.vehicleId} />
          </div>
          <EMITable EMI={emi_data} />
        </div>
      </div>
    </div>
  );
}
