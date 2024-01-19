import React from "react";
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

export default function DialogTrips() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            title="Open Delivires"
            className="flex items-center"
          >
            Orders
            <Image
              src="/delivery.svg"
              alt="delivery"
              width={22}
              height={22}
              className="pl-1"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[95%] h-[95%]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when your are done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
