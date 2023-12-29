"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import EnvAPI from "@/lib/EnvAPI";

export default function CreateOrder({ vehicleId, tripId }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const { AuthTokens, logOutUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const url = EnvAPI();

  const gotToOrder = (orderId) => {
    router.push(
      `/vehicles/${vehicleId}/${tripId}/order-details?key=${orderId}`
    );
  };

  const insertOrder = async (data) => {
    const Order = await fetch(`${url}/api/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthTokens.access,
      },
      body: JSON.stringify({ order_data: data, trip_id: tripId }),
    });

    if (Order.status === 200) {
      const response = await Order.json();
      return response;
    } else {
      logOutUser();
      return null;
    }
  };

  const onSubmit = (data) => {
    console.log("Data", data);
    const orderResponse = insertOrder(data);
    setShow(true);
    reset(); // Reset form
    setTimeout(() => {
      orderResponse.then((data) => {
        gotToOrder(data.order_id);
      });
    }, 2000);
  };

  return (
    <div className="m-4 sm:m-8">
      <Link
        href={{
          pathname: `/vehicles/${vehicleId}/${tripId}`,
        }}
        className="flex items-center justify-start w-[70px] gap-1 p-1
        hover:cursor-pointer hover:bg-purple-100 hover:text-primary mb-2"
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

      <div className="mb-4 border-b border-neutral-300">
        <p className="text-left text-lg font-semibold pb-1">New Order</p>
        <p className="font-semibold text-gray-500">New order for {vehicleId}</p>
      </div>

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto text-base"
      >
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-semibold mb-2 md:text-md"
          >
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            defaultValue=""
            {...register("date", { required: true })}
            className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
            leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
            focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
              errors.date ? "border-pink-500" : "border-neutral-300"
            }`}
          />
          {errors.date && (
            <span className="text-sm text-pink-500">
              This field is required
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <div className="mb-4">
            <label
              htmlFor="grade"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Grade
            </label>
            <input
              type="text"
              id="grade"
              defaultValue=""
              {...register("grade", { required: true })}
              placeholder="Grade"
              className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
              leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
              focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                errors.grade ? "border-pink-500" : "border-neutral-300"
              }`}
            />
            {errors.grade && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Quantity
            </label>
            <input
              type="number"
              step="0.01"
              id="quantity"
              defaultValue=""
              {...register("quantity", { required: true })}
              placeholder="Load in tons"
              className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
              leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
              focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                errors.quantity ? "border-pink-500" : "border-neutral-300"
              }`}
            />
            {errors.quantity && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="fromLocation"
            className="block text-gray-700 font-semibold mb-2 md:text-md"
          >
            From
          </label>
          <input
            type="text"
            id="fromLocation"
            defaultValue=""
            {...register("fromLocation", { required: true })}
            placeholder="From location"
            className={`w-full px-3 py-2 border rounded-md text-gray-700 
            leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
            focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
              errors.fromLocation ? "border-pink-500" : "border-neutral-300"
            }`}
          />
          {errors.fromLocation && (
            <span className="text-sm text-pink-500">
              This field is required
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="toLocation"
            className="block text-gray-700 font-semibold mb-2 md:text-md"
          >
            To
          </label>
          <input
            type="text"
            id="toLocation"
            defaultValue=""
            {...register("toLocation", { required: true })}
            placeholder="To location"
            className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
            leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
            focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
              errors.toLocation ? "border-pink-500" : "border-neutral-300"
            }`}
          />
          {errors.toLocation && (
            <span className="text-sm text-pink-500">
              This field is required
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="shipment"
            className="block text-gray-700 font-semibold mb-2 md:text-md"
          >
            Shipment / Delivery Number
          </label>
          <input
            type="text"
            id="shipmentNumber"
            defaultValue=""
            {...register("shipmentNumber", { required: true })}
            placeholder="Shipment Number"
            className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
            leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
            focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
              errors.shipmentNumber ? "border-pink-500" : "border-neutral-300"
            }`}
          />
          {errors.shipmentNumber && (
            <span className="text-sm text-pink-500">
              This field is required
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <div className="mb-4">
            <label
              htmlFor="partyName"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Party Name
            </label>
            <input
              type="text"
              id="partyName"
              defaultValue=""
              {...register("partyName", { required: true })}
              placeholder="party name"
              className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
              leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
              focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                errors.partyName ? "border-pink-500" : "border-neutral-300"
              }`}
            />
            {errors.partyName && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="advance"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
            >
              Advance
            </label>
            <input
              type="number"
              id="advance"
              defaultValue=""
              {...register("advance", { required: true })}
              placeholder="₹0.00"
              className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
              leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
              focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
                errors.advance ? "border-pink-500" : "border-neutral-300"
              }`}
            />
            {errors.advance && (
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
          <button
            type="submit"
            className="w-full text-white bg-purple-500 hover:bg-purple-600 
            font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
