import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { formatYYYYMMDDToDDMMYYYY, numberWithCommas } from "@/app/utils/helper";

export default function EMITable({ EMI }) {
  return (
    <Table>
      <TableHeader className="sticky top-0 border border-gray-600 bg-slate-100">
        <TableRow>
          {EMI["column_names"].map((column, i) => (
            <TableHead
              key={i}
              className="text-center border border-gray-600 text-xs md:text-sm"
            >
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {EMI["column_values"].map((column, i) => (
          <TableRow key={i}>
            {EMI["column_names"].map((column_name, index) => (
              <TableCell
                key={index}
                className="border border-r border-gray-600 text-center text-xs md:text-sm"
              >
                {index == 1
                  ? formatYYYYMMDDToDDMMYYYY(column[column_name])
                  : index == 2
                  ? `₹${numberWithCommas(column[column_name])}`
                  : index === 3
                  ? column[column_name].charAt(0).toUpperCase() +
                    column[column_name].slice(1)
                  : column[column_name]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
