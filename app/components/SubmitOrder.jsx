"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";
import { numberWithCommas } from "../utils/helper";
import Image from "next/image";

export default function SubmitOrder({
  tripTypeStatus,
  orderId,
  tripDetails,
  vehicleId,
}) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [freightAmount, setFreightAmount] = useState(0);
  const [driverAmount, setDriverAmount] = useState(0);

  const tripType = tripTypeStatus;
  const router = useRouter();

  useEffect(() => {
    const getOrderQuantityData = async () => {
      const getOrderQuantity = await fetch(
        `/api/submit-order-data?key=${orderId}`
      );
      const orderQuantity = await getOrderQuantity.json();

      setQuantity(orderQuantity.quantity);
    };

    getOrderQuantityData();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const handleTotalExpenses = () => {
    console.log("Function Called");
    const loading = parseInt(watch("loading"));
    const unLoading = parseInt(watch("unloading"));
    const tollGate = parseInt(watch("tollGate"));
    const pclRto = parseInt(watch("pclRto"));

    setValue(
      "totalExpenses",
      (loading + unLoading + tollGate + pclRto).toFixed()
    );
  };

  const handleFreightAmount = () => {
    const freight = parseInt(watch("freight"));
    console.log("freight", freight, "quantity", quantity);
    const amount = freight * quantity;
    setFreightAmount(amount);
  };

  const handleDriverAmount = () => {
    const driverFreight = parseInt(watch("driverFreight"));
    setDriverAmount((quantity * driverFreight * 0.11).toFixed());
  };

  const updateOrder = async (order) => {
    const updateOrderDetails = await fetch(`/api/submit-order-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const response = await updateOrderDetails.json();

    return response;
  };

  const onSubmit = (data) => {
    data["freightAmount"] = freightAmount;
    data["driverAmount"] = driverAmount;
    data["submitStatus"] = true;

    let orderData = {
      id: orderId,
      order_data: data,
    };
    console.log("Data", orderData);
    const orderStatus = updateOrder(orderData);
    // orderStatus.then()
    setShow(true);
    reset(); // Reset form
    setTimeout(() => {
      router.push(
        `/vehicles/${vehicleId}/${tripDetails}/order-details?key=${orderId}&trip-type=${tripType}`
      ); // redirect to home page
    }, 2000);
  };

  return (
    <>
      {show && (
        <div className="flex items-center justify-center">
          <div className={`fixed text-center cursor-pointer z-10 `}>
            <div className="flex items-center gap-1 bg-amber-200 border border-black border-dashed p-2">
              <Image src="/ok.png" alt="Verification" width={25} height={15} />
              Order Submitted Succussfully
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="flex gap-3">
          <div className="mb-4">
            <label
              htmlFor="loading"
              className="block text-gray-700 font-semibold mb-2 md:text-lg"
            >
              Loading
            </label>
            <Controller
              name="loading"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="loading"
                  onChange={(e) => {
                    field.onChange(e);
                    handleTotalExpenses();
                  }}
                  placeholder="₹0.00"
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-indigo-500 
                  focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-neutral-400 ${
                    errors.loading ? "border-pink-500" : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.loading && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="unloading"
              className="block text-gray-700 font-semibold mb-2 md:text-lg"
            >
              Unloading
            </label>
            <Controller
              name="unloading"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="unloading"
                  placeholder="₹0.00"
                  onChange={(e) => {
                    field.onChange(e);
                    handleTotalExpenses();
                  }}
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-indigo-500 
                  focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-neutral-400 ${
                    errors.unloading ? "border-pink-500" : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.unloading && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="mb-4">
            <label
              htmlFor="tollGate"
              className="block text-gray-700 font-semibold mb-2 md:text-lg"
            >
              Toll Gate
            </label>
            <Controller
              name="tollGate"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="tollGate"
                  placeholder="₹0.00"
                  onChange={(e) => {
                    field.onChange(e);
                    handleTotalExpenses();
                  }}
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-indigo-500 
                  focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-neutral-400 ${
                    errors.tollGate ? "border-pink-500" : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.tollGate && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="pclRto"
              className="block text-gray-700 font-semibold mb-2 md:text-lg"
            >
              RTO & PC
            </label>
            <Controller
              name="pclRto"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="pclRto"
                  placeholder="₹0.00"
                  onChange={(e) => {
                    field.onChange(e);
                    handleTotalExpenses();
                  }}
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-indigo-500 
                  focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-neutral-400 ${
                    errors.pclRto ? "border-pink-500" : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.pclRto && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="totalExpenses"
            className="block text-gray-700 font-semibold mb-2 md:text-lg"
          >
            Total Expenses
          </label>
          <Controller
            name="totalExpenses"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="number"
                readOnly
                id="totalExpenses"
                placeholder="₹0.00"
                onChange={(e) => {
                  const rawValue = e.target.value;
                  const numericValue = rawValue.replace(/[^0-9.]/g, "");
                  const formattedValue = numberWithCommas(numericValue);
                  field.onChange(formattedValue);
                }}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-indigo-500 
                  focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-neutral-400"
              />
            )}
          />
        </div>

        <div className="flex gap-3">
          <div className="mb-4">
            <label
              htmlFor="freight"
              className="block text-gray-700 font-semibold mb-2 md:text-lg"
            >
              Freight
            </label>
            <Controller
              name="freight"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="freight"
                  placeholder="000"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFreightAmount();
                  }}
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-indigo-500 
                  focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-neutral-400 ${
                    errors.freight ? "border-pink-500" : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.freight && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="driverFreight"
              className="block text-gray-700 font-semibold mb-2 md:text-lg"
            >
              Driver Freight
            </label>
            <Controller
              name="driverFreight"
              control={control}
              defaultValue=""
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="driverFreight"
                  placeholder="000"
                  onChange={(e) => {
                    field.onChange(e);
                    handleDriverAmount();
                  }}
                  className={`w-full px-3 py-2 border border-neutral-300 rounded-md text-gray-700 
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-indigo-500 
                  focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-neutral-400 ${
                    errors.driverFreight
                      ? "border-pink-500"
                      : "border-neutral-300"
                  }`}
                />
              )}
            />
            {errors.driverFreight && (
              <span className="text-sm text-pink-500">
                This field is required
              </span>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full text-white bg-indigo-500 hover:bg-indigo-600 
            font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
