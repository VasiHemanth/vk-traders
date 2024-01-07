import React from "react";

import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import Addbutton from "../components/AddButton";
import EnvAPI from "../../lib/EnvAPI";

import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Vehicle() {
  console.log("API URL", process.env.NODE_ENV);

  const envUrl = EnvAPI();

  const cookieStore = cookies();
  // console.log("access token", cookieStore.get("django-auth-access").value);

  const accessToken =
    cookieStore.get("django-auth-access") != undefined
      ? cookieStore.get("django-auth-access").value
      : null;

  // if (accessToken != null) {
  //   console.log("cool");
  // } else {
  //   throw new Error("Go to login page");
  // }

  let getVehicles;

  try {
    const vehicles = await fetch(`${envUrl}/api/all-vehicles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookieStore.get("django-auth-access").value,
      },
    });
    getVehicles = await vehicles.json();
  } catch (e) {
    console.log(e);
  }

  return (
    <>
      <div className="py-4 bg-card border-b border-neutral-300 grid place-items-center sticky top-14 z-50">
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
