"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";

import { Input } from "../ui/input";
import EnvAPI from "@/lib/EnvAPI";
import ButtonLoader from "../ButtonLoader";

export default function VehicleMonthSelector({
  vehicle,
  handleVehicleMonthSelection,
}) {
  const [filter, setFilter] = useState({
    trucks: [],
    monthYear: "2023-08",
    selectedTruck: "",
    loading: false,
  });

  const url = EnvAPI();

  useEffect(() => {
    const getAllTrucks = async () => {
      const allTrucks = await fetch(`${url}/api/all-trucks`);
      const truckResponse = await allTrucks.json();

      setFilter({ ...filter, trucks: truckResponse });
    };

    getAllTrucks();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFilter({ ...filter, loading: true });
    const okStatus = await handleVehicleMonthSelection(
      filter.monthYear,
      filter.selectedTruck
    );
    if (okStatus) {
      setFilter({ ...filter, loading: false });
    } else {
      throw new Error("Failed getting data");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-start gap-1 w-full sm:w-auto
          sm:flex-row sm:items-center"
    >
      <p className="pr-1 text-secondary-foreground text-sm">
        Select Truck and month
      </p>

      <div className="w-full sm:w-[170px]">
        <Select
          className="w-full sm:w-auto"
          onValueChange={(e) => setFilter({ ...filter, selectedTruck: e })}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={vehicle}
              className="text-muted-foreground"
            />
          </SelectTrigger>
          <SelectContent>
            {filter.trucks.length != 0 &&
              filter.trucks.map((trucks, i) => (
                <SelectItem key={i} value={trucks.registration_number}>
                  {trucks.registration_number}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <Input
        type="month"
        value={filter.monthYear}
        onChange={(e) => {
          setFilter({ ...filter, monthYear: e.target.value });
        }}
        className="p-[7px] rounded-md text-sm w-full sm:w-[170px]"
      />
      <Button type="submit" className="w-full sm:w-auto">
        {filter.loading ? (
          <>
            <ButtonLoader /> Getting data...
          </>
        ) : (
          <>Submit</>
        )}
      </Button>
    </form>
  );
}
