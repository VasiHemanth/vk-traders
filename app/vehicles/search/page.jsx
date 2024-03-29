import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";

import SearchBar from "../../components/SearchBar";
import Card from "../../components/Card";

import EnvAPI from "@/lib/EnvAPI";

export default async function Search(props) {
  const cookieStore = cookies();

  const envUrl = EnvAPI();

  const searchVehicle = await fetch(
    `${envUrl}/api/search?search-string=${props.searchParams["lorry"]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookieStore.get("django-auth-access").value,
      },
    }
  );

  const lorry_details = await searchVehicle.json();

  return (
    <>
      <div className="py-4 bg-card border-b-2 grid place-items-center sticky top-14 z-50">
        <SearchBar />
      </div>
      {lorry_details.length > 0 ? (
        <p className="m-2 text-center bg-green-300">
          Found vehicles with number <b>{props.searchParams["lorry"]}</b>
        </p>
      ) : (
        <>
          <p className="m-2 text-center bg-pink-300">
            No vehicles found with number <b>{props.searchParams["lorry"]}</b>
          </p>
          <div className="flex items-center justify-center">
            <Link
              href="/vehicles"
              className=" p-2 text-white bg-primary rounded-md
        hover:cursor-pointer hover:bg-purple-600 "
            >
              Go to Home
            </Link>
          </div>
        </>
      )}
      <div className="flex items-center justify-center overflow-y-auto">
        <div className="my-5 grid grid-flow-row sm:grid-cols-2 xl:grid-cols-3">
          {lorry_details.map((lorry) => (
            <div key={lorry.registration_number}>
              <Card lorry={lorry} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
