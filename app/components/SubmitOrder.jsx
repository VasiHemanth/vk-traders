"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import AuthContext from "../context/AuthContext";
import { numberWithCommas } from "../utils/helper";
import EnvAPI from "@/lib/EnvAPI";

import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useForm, Controller } from "react-hook-form";

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

  const { AuthTokens, logOutUser } = useContext(AuthContext);

  const tripType = tripTypeStatus;
  const router = useRouter();
  const url = EnvAPI();

  useEffect(() => {
    const getOrderQuantityData = async () => {
      const getOrderQuantity = await fetch(
        `${url}/api/submit-order-data?key=${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + AuthTokens.access,
          },
        }
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
    const amount = freight * quantity;
    setFreightAmount(amount);
  };

  const handleDriverAmount = () => {
    const driverFreight = parseInt(watch("driverFreight"));
    setDriverAmount((quantity * driverFreight * 0.11).toFixed());
  };

  const updateOrder = async (order) => {
    const updateOrderDetails = await fetch(`${url}/api/submit-order-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthTokens.access,
      },
      body: JSON.stringify(order),
    });

    if (updateOrderDetails.status === 200) {
      const response = await updateOrderDetails.json();
      return response;
    } else {
      logOutUser();
      return null;
    }
  };

  const onSubmit = (data) => {
    data["freightAmount"] = freightAmount;
    data["driverAmount"] = driverAmount;
    data["submitStatus"] = true;

    console.log("data", data);

    let orderData = {
      id: orderId,
      order_data: data,
    };
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
              className="block text-gray-700 font-semibold mb-2 md:text-md"
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
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
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
              className="block text-gray-700 font-semibold mb-2 md:text-md"
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
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
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
              className="block text-gray-700 font-semibold mb-2 md:text-md"
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
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
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
              className="block text-gray-700 font-semibold mb-2 md:text-md"
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
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
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
            className="block text-gray-700 font-semibold mb-2 md:text-md"
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
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400"
              />
            )}
          />
        </div>

        <div className="flex gap-3">
          <div className="mb-4">
            <label
              htmlFor="freight"
              className="block text-gray-700 font-semibold mb-2 md:text-md"
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
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
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
              className="block text-gray-700 font-semibold mb-2 md:text-md"
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
                  leading-tight focus:shadow-outline drop-shadow-sm focus:border-purple-500 
                  focus:outline-none focus:ring-1 focus:ring-purple-500 hover:border-neutral-400 ${
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
        <div className="mb-4">
          <label
            htmlFor="gst"
            className="block text-gray-700 font-semibold mb-2 md:text-md"
          >
            Apply GST
          </label>
          <Controller
            name="gst"
            control={control}
            defaultValue={false}
            // rules={{ required: "This field is required" }}
            render={({ field }) => (
              <>
                {/* <Switch
                  checked={field.value}
                  onCheckedChange={(e) => field.onChange(e)}
                  className={`${errors.gst ? "bg-pink-500" : "bg-neutral-300"}`}
                /> */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...field}
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    // checked={field.value}
                    // onChange={field.onChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
                {errors.gst && (
                  <span className="text-sm text-pink-500">
                    This field is required
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div>
          <Button type="submit" className="w-full py-2 px-4 ">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
