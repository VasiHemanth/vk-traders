import React from "react";

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
import Image from "next/image";

export default function AddServiceDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" title="Open Maintenance">
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              placeholder="Wheel Alignment"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service">Service Name</Label>
            <Input
              id="service"
              placeholder="Wheel Alignment"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="charges">Charges (₹)</Label>
            <Input id="charges" placeholder="1200" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
