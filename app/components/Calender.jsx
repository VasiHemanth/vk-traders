import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

export default function CalendarButton({ monthYear, handleMonth }) {
  const monthYearDate = new Date(monthYear);

  const [selectedDate, setSelectedDate] = useState(monthYearDate);

  const handleDateChange = (date) => {
    const dateObj = new Date(date);
    const monthName = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    const convertedDateStr = `${monthName} ${year}`;
    handleMonth(convertedDateStr);
    setSelectedDate(date);
  };

  const CustomDatePickerInput = ({ value, onClick }) => {
    return (
      <div
        className="flex items-center justify-center relative text-[#2EB6AE] 
        border border-[#2EB6AE] teal-calender h-8 place-items-center rounded-md 
         text-sm py-4 px-2 2xl:text-lg"
      >
        <input
          id="calPicker"
          type="text"
          className="w-20 h-8 rounded bg-transparent"
          value={value}
          onClick={onClick}
          readOnly
        />
        <div
          className="relative lg:w-5 lg:h-5 xl:w-6 xl:h-6 cursor-pointer transition-transform duration-250 transform hover:scale-110"
          onClick={onClick}
        >
          <Image src="/calendar.svg" layout="fill" alt="Calendar Icon" />
        </div>
      </div>
    );
  };

  const handleDatePickerClick = () => {
    // Perform your desired action when the date picker is clicked
    console.log("Date picker clicked");
  };

  return (
    <DatePicker
      selected={
        new Date(
          typeof window !== "undefined" &&
            sessionStorage.getItem("active_month")
        )
      }
      onChange={handleDateChange}
      className="text-[#2EB6AE] border border-[#2EB6AE] h-8 
            place-items-center px-2 rounded-md mr-2 text-sm 2xl:text-lg"
      dateFormat="MMM yyyy"
      showMonthYearPicker
      maxDate={new Date()}
      popperModifiers={{
        preventOverflow: {
          enabled: true,
        },
      }}
      onCalendarOpen={() =>
        setSelectedDate(
          new Date(
            typeof window !== "undefined" &&
              sessionStorage.getItem("active_month")
          )
        )
      }
      customInput={
        <CustomDatePickerInput
          value={
            new Date(
              typeof window !== "undefined" &&
                sessionStorage.getItem("active_month")
            )
          }
          onClick={() => handleDatePickerClick()}
        />
      }
    />
  );
}
