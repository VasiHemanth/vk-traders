"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

export default function NewTrip() {
  const [vehicleData, setVehicleData] = useState(null);
  const [show, setShow] = useState(false);
  const tripTypeOptions = [
    { label: "One Way", value: "One Way" },
    { label: "Round Trip", value: "Round Trip" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const fetchVehicleId = async () => {
    const vehicleData = await fetch(`/api/create-trip`);
    const options = await vehicleData.json();
    setVehicleData(options);
  };

  useEffect(() => {
    fetchVehicleId();
  }, []);

  const insertTrip = async (data) => {
    const AddTrip = await fetch(`/api/create-trip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await AddTrip.json();
    return response;
  };

  const gotToHome = (data) => {
    router.push(`/vehicles/${data.vehicle_id}/${data.id}/add-order`);
  };

  const onSubmit = (data) => {
    console.log("Data", data);
    const returnedTripData = insertTrip(data);
    setShow(true);
    reset(); // Reset form
    setTimeout(() => {
      returnedTripData.then((data) => {
        gotToHome(data); // redirect to home page
      });
    }, 2000);
  };

  return (
    <div className="m-4 sm:m-8 w-full">
      <Link
        href="/vehicles"
        className="flex items-center justify-start w-[70px] gap-1 p-1
        hover:cursor-pointer hover:bg-indigo-100 hover:text-indigo-500 mb-2"
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

      <div className="mb-4 border-b max-w-md mx-auto">
        <p className="text-center text-lg font-semibold pb-1">New Trip</p>
      </div>

      {show && (
        <div className="flex items-center justify-center">
          <div className={`fixed text-center cursor-pointer z-10 `}>
            <div className="flex items-center gap-1 bg-amber-200 border border-black border-dashed p-2">
              <Image src="/ok.png" alt="Verification" width={25} height={15} />
              Trip Created Succussfully
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto text-base"
      >
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-semibold mb-2 md:text-lg"
          >
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            defaultValue=""
            {...register("date", { required: true })}
            className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
            leading-tight focus:shadow-outline drop-shadow-sm focus:border-indigo-500 
            focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-neutral-400 ${
              errors.date ? "border-pink-500" : "border-neutral-300"
            }`}
          />
          {errors.date && (
            <span className="text-sm text-pink-500">
              This field is required
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="tripType"
            className="block text-gray-700 font-semibold mb-2 md:text-lg"
          >
            Trip Type
          </label>
          <Controller
            name="tripType" // Name of the field in the form
            control={control} // Provide the react-hook-form control
            defaultValue={tripTypeOptions[0]} // Set default value to null or a specific option
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
                {...field} // Spread the field object into the Select component
                options={tripTypeOptions}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
                    border: errors.tripType
                      ? "1px solid #ec4899"
                      : state.isFocused
                      ? "2px solid #a855f7"
                      : "1px solid #d1d5db",
                  }),
                }}
              />
            )}
          />
          {errors.tripType && (
            <span className="text-sm text-pink-500">
              {errors.tripType.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="Trips"
            className="block text-gray-700 font-semibold mb-2 md:text-lg"
          >
            No of Trips
          </label>
          <input
            type="number"
            id="Trips"
            defaultValue={1}
            {...register("Trips", { required: true })}
            placeholder="Enter number"
            className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
              leading-tight focus:shadow-outline drop-shadow-sm focus:border-indigo-500 
              focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-neutral-400 ${
                errors.Trips ? "border-pink-500" : "border-neutral-300"
              }`}
          />
          {errors.Trips && (
            <span className="text-sm text-pink-500">
              This field is required
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="vehicle"
            className="block text-gray-700 font-semibold mb-2 md:text-lg"
          >
            Vehicle
          </label>
          <Controller
            name="selectedVehicle" // Name of the field in the form
            control={control} // Provide the react-hook-form control
            defaultValue={null} // Set default value to null or a specific option
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
                {...field} // Spread the field object into the Select component
                options={vehicleData}
                isSearchable
                placeholder="Serach by Vehicle number"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
                    border: errors.selectedVehicle
                      ? "1px solid #ec4899"
                      : state.isFocused
                      ? "2px solid #6366f1"
                      : "1px solid #d1d5db",
                  }),
                }}
              />
            )}
          />
          {errors.selectedVehicle && (
            <span className="text-sm text-pink-500">
              {errors.selectedVehicle.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="fromLocation"
            className="block text-gray-700 font-semibold mb-2 md:text-lg"
          >
            Owner Name
          </label>
          <input
            type="text"
            id="ownerName"
            defaultValue=""
            {...register("ownerName", { required: true })}
            placeholder="Owner"
            className={`w-full px-3 py-2 border rounded-md text-gray-700 
            leading-tight focus:shadow-outline drop-shadow-sm focus:border-indigo-500 
            focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-neutral-400 ${
              errors.ownerName ? "border-pink-500" : "border-neutral-300"
            }`}
          />
          {errors.ownerName && (
            <span className="text-sm text-pink-500">
              This field is required
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full mt-4 text-white bg-indigo-500 hover:bg-indigo-600 
            font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
