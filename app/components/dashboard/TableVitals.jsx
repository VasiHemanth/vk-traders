import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { numberWithCommas } from "@/app/utils/helper";

export default function TableVitals({ expenses, query }) {
  let total = 0;
  expenses.forEach((element) => {
    total += element["value"];
  });

  return (
    <Table>
      <TableCaption>{query.vehicle}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Expenses</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.label}>
            <TableCell className="font-medium">{expense.label}</TableCell>
            <TableCell>₹{numberWithCommas(expense.value)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>₹{numberWithCommas(total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
