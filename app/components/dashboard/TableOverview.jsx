import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

export default function TableOverview({ allTrips }) {
  return (
    <Table>
      <TableCaption>
        A list of all the orders for AP04-AB-7158 in November
      </TableCaption>
      <TableHeader className="sticky top-0 bg-slate-200">
        <TableRow>
          {allTrips["column_names"].map((column, index) => (
            <TableHead key={index}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {expenses.map((expense) => (
          <TableRow key={expense.label}>
            <TableCell className="font-medium">{expense.label}</TableCell>
            <TableCell>{expense.value}</TableCell>
          </TableRow>
        ))} */}
        {[
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
        ].map((data, index) => (
          <TableRow key={index}>
            {allTrips["column_names"].map((column, i) => (
              <TableCell key={i} className="font-medium">
                {column}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
