"use client";

import React from "react";
import Image from "next/image";
import { revalidatePath } from "next/cache";

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

export default function AddServiceDialog({ vehicle_id }) {
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
  const router = useRouter();
  const { toast } = useToast();

  const handleSave = async (data) => {
    data["vehicle_id"] = vehicle_id;
    console.log("data", data);
    const submitMaintenance = await fetch(`${url}/api/maintenance-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + AuthTokens.access,
      },
      body: JSON.stringify(data),
    });

    const verifyRecord = await submitMaintenance.json();

    if (verifyRecord.message) {
      toast({
        description: verifyRecord.message,
      });
    }
    reset();
    router.push(`/vehicles/${vehicle_id}/maintenance?`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" title="Add Maintenance">
          Add
          <Image
            src="/maintenance.svg"
            alt="maintenance"
            width={22}
            height={22}
            className="pl-1"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Maintenance</DialogTitle>
          <DialogDescription>
            {`Add servicing, repairs and aftercare maintenance tasks. Click save
            when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maintenance_date">
                Date{" "}
                {errors.maintenance_date && (
                  <span className="text-sm text-pink-500">
                    <sup className="text-xs">*</sup>
                  </span>
                )}
              </Label>
              <Input
                defaultValue=""
                {...register("maintenance_date", { required: true })}
                id="maintenance_date"
                type="date"
                placeholder="Wheel Alignment"
                className={`col-span-3 ${
                  errors.maintenance_date ? "border-pink-500" : ""
                }`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="charges">
                Charges (₹)
                {errors.charges && (
                  <span className="text-sm text-pink-500">
                    <sup className="text-xs">*</sup>
                  </span>
                )}
              </Label>
              <Input
                type="number"
                defaultValue=""
                {...register("charges", { required: true })}
                id="charges"
                placeholder="1200"
                className={`col-span-3 ${
                  errors.charges ? "border-pink-500" : ""
                }`}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
