"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useToast } from "@/app/components/ui/use-toast";

import { useForm, Controller } from "react-hook-form";
import EnvAPI from "@/lib/EnvAPI";
import { useRouter } from "next/navigation";
import AuthContext from "@/app/context/AuthContext";
import ButtonLoader from "../ButtonLoader";

export default function AddServiceDialog({ vehicle_id }) {
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const { AuthTokens } = useContext(AuthContext);

  const url = EnvAPI();
  const router = useRouter();
  const { toast } = useToast();

  const handleSave = async (data) => {
    setLoader(true);
    data["vehicle_id"] = vehicle_id;
    data["emi_type"] = "truck";
    console.log("data", data);
    const submitEmi = await fetch(`${url}/api/emi-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthTokens.access,
      },
      body: JSON.stringify(data),
    });

    const verifyRecord = await submitEmi.json();

    if (verifyRecord.message) {
      setLoader(false);
      toast({
        description: verifyRecord.message,
      });
    }
    reset();
    router.push(`/vehicles/${vehicle_id}/emi?`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" title="Add Emi">
          Add
          <Image
            src="/loan.svg"
            alt="loan"
            width={22}
            height={22}
            className="pl-1"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add EMI</DialogTitle>
          <DialogDescription>{`Enter emi data for ${vehicle_id}`}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="emi_date">
                Date{" "}
                {errors.emi_date && (
                  <span className="text-sm text-pink-500">
                    <sup className="text-xs">*</sup>
                  </span>
                )}
              </Label>
              <Input
                defaultValue=""
                {...register("emi_date", { required: true })}
                id="emi_date"
                type="date"
                placeholder="Wheel Alignment"
                className={`col-span-3 ${
                  errors.emi_date ? "border-pink-500" : ""
                }`}
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activity_name">
                Service Name{" "}
                {errors.activity_name && (
                  <span className="text-sm text-pink-500">
                    <sup className="text-xs">*</sup>
                  </span>
                )}
              </Label>
              <Input
                type="text"
                defaultValue=""
                {...register("activity_name", { required: true })}
                id="activity_name"
                placeholder="Wheel Alignment"
                className={`col-span-3 ${
                  errors.activity_name ? "border-pink-500" : ""
                }`}
              />
            </div> */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="emi_amount">
                EMI Amount (₹)
                {errors.emi_amount && (
                  <span className="text-sm text-pink-500">
                    <sup className="text-xs">*</sup>
                  </span>
                )}
              </Label>
              <Input
                type="number"
                defaultValue=""
                {...register("emi_amount", { required: true })}
                id="emi_amount"
                placeholder="90000"
                className={`col-span-3 ${
                  errors.emi_amount ? "border-pink-500" : ""
                }`}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {loader ? (
                <>
                  <ButtonLoader /> Submitting...
                </>
              ) : (
                <>Save</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
