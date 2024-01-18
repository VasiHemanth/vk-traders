"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

export default function ServiceAccordion({ maintenance }) {
  return (
    <Accordion type="multiple" collapsible="true" className="w-full">
      {maintenance["monthYear"].map((monthYear, i) => (
        <AccordionItem key={i} value={`item-${i + 1}`}>
          <AccordionTrigger className="text-base">{monthYear}</AccordionTrigger>
          <AccordionContent className="text-base">
            {maintenance["activities"].map((activity, j) => {
              const servicesForMonth = activity[monthYear] || [];

              return servicesForMonth.map((service, index) => (
                <div
                  key={index}
                  className="mb-4 w-full text-gray-600 font-medium flex flex-row"
                >
                  <span className="basis-1/2">{service.activity_name}</span>
                  <span className="text-center basis-1/6">:</span>
                  <span className="text-left basis-3/4">
                    ₹{service.charges}
                  </span>
                </div>
              ));
            })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
