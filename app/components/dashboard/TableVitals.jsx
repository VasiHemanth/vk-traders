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

export default function TableVitals({ expenses }) {
  return (
    <Table>
      <TableCaption>A list of all the Total expenses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Expenses</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.label}>
            <TableCell className="font-medium">{expense.label}</TableCell>
            <TableCell>{expense.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
