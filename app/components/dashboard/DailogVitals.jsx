import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/app/components/ui/dialog";
import CardIcon from "./CardIcon";
import TableVitals from "./TableVitals";
import { formatmonthYeartoLongMonth } from "@/app/utils/helper";

export default function DailogVitals({ data, totalExpenses, query }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="hover:border-2 hover:border-primary rounded-2xl">
          <CardIcon
            title={data.title}
            description={data.description}
            value={data.value}
            icon={data.icon}
            color={data.color}
          />
        </div>
        {/* <button>Click here</button> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>
            Detailed statement of {formatmonthYeartoLongMonth(query.monthYear)}{" "}
            {data.title === "Total Expenditure" ? (
              <>expenditures</>
            ) : (
              <>maintenance spending</>
            )}
          </DialogDescription>
        </DialogHeader>
        <TableVitals expenses={totalExpenses} query={query} />
      </DialogContent>
    </Dialog>
  );
}
