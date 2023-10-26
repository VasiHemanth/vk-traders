import React from "react";

import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import Addbutton from "../components/AddButton";
import EnvAPI from "../lib/EnvAPI";

export const dynamic = "force-dynamic";

export default async function Vehicle() {
  console.log("API URL", process.env.NODE_ENV);

  const envUrl = EnvAPI();

  const vehicles = await fetch(`${envUrl}/api/all-vehicles`);
  const getVehicles = await vehicles.json();

  return (
    <>
      <div className="py-4 bg-neutral-200 border-b-2 border-indigo-500 grid place-items-center sticky top-14 z-50">
        <SearchBar />
      </div>
      <div className="flex items-center justify-center overflow-y-auto">
        <div className="my-5 grid grid-flow-row sm:grid-cols-2 xl:grid-cols-3">
          {getVehicles.map((lorry) => (
            <div key={lorry.id}>
              <Card lorry={lorry} />
            </div>
          ))}
        </div>
      </div>
      <Addbutton />
    </>
  );
}
