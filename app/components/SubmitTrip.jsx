"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";

import EnvAPI from "@/lib/EnvAPI";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export default function SubmitTrip({ vehicleId, tripId }) {
  const [show, setShow] = useState(false);

  const { data } = useSession();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const url = EnvAPI();

  const handleMileage = () => {
    const distance = watch("tripDistance");
    const dieselInLitres = watch("dieselLitres");
    setValue("mileage", (distance / dieselInLitres).toFixed(2));
  };

  const handleDieselPerLitre = () => {
    const totalLitres = watch("dieselLitres");
    const dieselPerLitre = watch("dieselPerLitre");
    setValue("dieselAmount", (totalLitres * dieselPerLitre).toFixed(2));
  };

  const handleAddBlue = () => {
    const totalLitres = parseFloat(watch("dieselLitres"));
    setValue("adBlue", ((5 / 100) * totalLitres * 65).toFixed());
  };

  const updateTripDetails = async (data) => {
    const updateData = await fetch(`${url}/api/submit-trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.user.access_token,
      },
      body: JSON.stringify({ tripId: tripId, trip_data: data }),
    });

    if (updateData.status === 200) {
      const response = await updateData.json();
      return response;
    } else {
      // logOutUser();
      return null;
    }
  };

  const onSubmit = (data) => {
    const response = updateTripDetails(data);
    response.then((message) => {
      if (message.message === "Trip submitted successfully") {
        setShow(true);
        reset(); // Reset form
        setTimeout(() => {
          router.push(`/vehicles/${vehicleId}/${tripId}`); // redirect to home page
        }, 2000);
      }
      console.log("message", message);
    });
  };

  return (
    <>
      {show && (
        <div className="flex items-center justify-center">
          <div className={`fixed text-center cursor-pointer z-10 `}>
            <div className="flex items-center gap-1 bg-amber-200 border border-black border-dashed p-2">
              <Image src="/ok.png" alt="Verification" width={25} height={15} />
              Data Submitted Succussfully
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="flex gap-3">
          <div className="mb-4">
            <label
              htmlFor="reading"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Reading <span className="text-gray-500 text-sm">in KMs</span>
            </label>
            <Controller
              name="reading"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="reading"
                  placeholder="0.00"
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                    errors.reading ? "border-pink-500" : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.reading && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="tripDistance"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Trip Distance
              <span className="text-gray-500 text-sm"> in KMs</span>
            </label>
            <Controller
              name="tripDistance"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="tripDistance"
                  placeholder="0.00"
                  onChange={(e) => {
                    field.onChange(e);
                    handleMileage();
                  }}
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                    errors.tripDistance
                      ? "border-pink-500"
                      : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.tripDistance && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="mb-4">
            <label
              htmlFor="dieselLitres"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Diesel <span className="text-gray-500 text-sm">in litres</span>
            </label>
            <Controller
              name="dieselLitres"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="dieselLitres"
                  placeholder="0.00"
                  onChange={(e) => {
                    field.onChange(e);
                    handleMileage();
                    handleDieselPerLitre();
                    handleAddBlue();
                  }}
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                    errors.dieselLitres
                      ? "border-pink-500"
                      : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.dieselLitres && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="dieselPerLitre"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Diesel{" "}
              <span className="text-gray-500 text-sm">
                Rate per litre (₹/L)
              </span>
            </label>
            <Controller
              name="dieselPerLitre"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="dieselPerLitre"
                  placeholder="₹0.00"
                  onChange={(e) => {
                    field.onChange(e);
                    handleDieselPerLitre();
                  }}
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                    errors.dieselPerLitre
                      ? "border-pink-500"
                      : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.dieselPerLitre && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="mb-4">
            <label
              htmlFor="dieselAmount"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Diesel Amount
            </label>
            <Controller
              name="dieselAmount"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="dieselAmount"
                  readOnly
                  placeholder="₹0.00"
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                    errors.dieselAmount
                      ? "border-pink-500"
                      : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.dieselAmount && (
              <span className="text-sm text-pink-500">
                Diesel in litres & Diesel rate per Litre are required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="mileage"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Mileage
            </label>
            <Controller
              name="mileage"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  readOnly
                  id="mileage"
                  placeholder="0.00"
                  step="0.00"
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                    errors.mileage ? "border-pink-500" : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.mileage && (
              <span className="text-sm text-pink-500">
                Reading & Trip Distance are required
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="mb-4">
            <label
              htmlFor="adBlue"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              AdBlue
            </label>
            <Controller
              name="adBlue"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="adBlue"
                  readOnly
                  placeholder="₹0.00"
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                    errors.adBlue ? "border-pink-500" : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.adBlue && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="maintanance"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Maintanance
            </label>
            <Controller
              name="maintanance"
              control={control}
              defaultValue={0}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="maintanance"
                  placeholder="0"
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                    leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                    focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                      errors.maintanance
                        ? "border-pink-500"
                        : "border-neutral-300"
                    }`}
                />
              )}
            />
            {errors.maintanance && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="mb-8">
          <label
            htmlFor="comments"
            className="block text-gray-700 font-semibold mb-2 md:text-md"
          >
            Comments
          </label>
          <textarea
            id="comments"
            rows={6}
            defaultValue=""
            {...register("comment")}
            placeholder="Comments"
            className="w-full px-5 py-3 border border-neutral-300 rounded-md text-gray-700 leading-tight 
            focus:shadow-outline focus:border-purple-500 
            focus:outline-none focus:ring-1 focus:ring-purple-500 drop-shadow-sm hover:border-neutral-400"
          />
        </div>
        <div>
          <Button
            type="submit"
            className="w-full  
            py-2 px-4"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
