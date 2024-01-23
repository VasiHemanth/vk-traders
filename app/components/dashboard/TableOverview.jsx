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
import { formatYYYYMMDDToDDMMYYYY } from "@/app/utils/helper";
import { object } from "zod";

export default function TableOverview({ allTrips }) {
  return (
    <Table>
      <TableHeader className="sticky top-0 border border-gray-600 bg-slate-100">
        <TableRow>
          {allTrips["column_names"].map((column, index) => (
            <TableHead
              key={index}
              className={`text-center border border-gray-600 ${
                index === 0 ? "px-8" : ""
              }`}
            >
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {allTrips["column_values"].map((column, i) => (
          <>
            <TableRow key={i}>
              <TableCell className="border border-r border-gray-600">
                {formatYYYYMMDDToDDMMYYYY(column["DATE"])}
                {/* {column["DATE"]} */}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["FROM"].toUpperCase()}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["TO"].toUpperCase()}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["QTY"]}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["ADVANCE"]}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["LOADING"]}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["UNLOADING"]}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["RTO & PC"]}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["TOLLGATE"]}
              </TableCell>
              {column["READING"] && (
                <TableCell
                  rowSpan={allTrips["row_span"][i]}
                  className="border border-r border-gray-600  text-center"
                >
                  {column["READING"]}
                </TableCell>
              )}
              {column["KMS"] && (
                <TableCell
                  rowSpan={allTrips["row_span"][i]}
                  className="border border-r border-gray-600  text-center"
                >
                  {column["KMS"]}
                </TableCell>
              )}
              {column["DIESEL"] && (
                <TableCell
                  rowSpan={allTrips["row_span"][i]}
                  className="border border-r border-gray-600  text-center"
                >
                  {column["DIESEL"]}
                </TableCell>
              )}
              {column["DIESEL AMT"] && (
                <TableCell
                  rowSpan={allTrips["row_span"][i]}
                  className="border border-r border-gray-600  text-center"
                >
                  {column["DIESEL AMT"]}
                </TableCell>
              )}
              {column["ADBLUE"] && (
                <TableCell
                  rowSpan={allTrips["row_span"][i]}
                  className="border border-r border-gray-600 text-center"
                >
                  {column["ADBLUE"]}
                </TableCell>
              )}
              {column["TOTAL EXPENSES"] && (
                <TableCell
                  rowSpan={allTrips["row_span"][i]}
                  className="border border-r border-gray-600 text-center"
                >
                  {column["TOTAL EXPENSES"]}
                </TableCell>
              )}
              {column["MILEAGE"] && (
                <TableCell
                  rowSpan={allTrips["row_span"][i]}
                  className="border border-r border-gray-600 text-center"
                >
                  {column["MILEAGE"]}
                </TableCell>
              )}
              <TableCell className="border border-r border-gray-600 text-center">
                {column["FREIGHT"]}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["FRIEGHT AMT"]}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["DRIVER FRIEGHT"]}
              </TableCell>
              <TableCell className="border border-r border-gray-600 text-center">
                {column["DRIVER AMT"]}
              </TableCell>
              {column["BALANCE AMT"] && (
                <TableCell
                  rowSpan={allTrips["row_span"][i]}
                  className="border border-r border-gray-600 text-center"
                >
                  {column["BALANCE AMT"]}
                </TableCell>
              )}
              <TableCell className="border border-r border-gray-600 text-center">
                {column["GST AMT"]}
              </TableCell>
              {column["BALANCE AMT (+GST)"] && (
                <TableCell
                  rowSpan={allTrips["row_span"][i]}
                  className="border border-r border-gray-600 text-center"
                >
                  {column["BALANCE AMT (+GST)"]}
                </TableCell>
              )}
            </TableRow>
          </>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="border-2 border-gray-600">
          {Object.entries(allTrips["total"]).map(([key, value], i) => (
            <TableCell
              key={key}
              className={`text-primary font-bold text-center border-y-2 border-gray-600 ${
                value != null ? "border-x" : ""
              }`}
            >
              {value}
            </TableCell>
          ))}
          {/* <TableCell>₹{numberWithCommas(total)}</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
