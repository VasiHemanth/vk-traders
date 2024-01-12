
export const color = (status) => {
  if (status === "In Transport") {
    return "text-sky-500";
  } else if (status === "Stable") {
    return "text-green-500";
  } else {
    return "text-red-500";
  }
};

export function formatmonthYeartoLongMonth(monthYear) {
  const dateObject = new Date(monthYear);
  const month = dateObject.toLocaleString('default', { month: 'long' });
  const year = dateObject.getFullYear();
  const formattedDate = `${month} ${year}`;
  return formattedDate
}

export function formatISODatetoDDMMYYY(dateString) {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, 0);
  const day = String(dateObj.getDate() + 1).padStart(2, 0);

  return `${day}-${month}-${year}`;
}

export function formatDateToDDMMYYYY(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export function formatDateToYYYYMMDD(dateStr) {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
}

export function formatDateAndTime(dateTimeString) {
  const dateObj = new Date(dateTimeString);
  const options = {
    day: "numeric",
    year: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(
    dateObj
  );
  return formattedDate;
}

// Forms
export const numberWithCommas = (value) => {
  if (value !== null) {
    const rawValue = value.toString().replace(/[^0-9.]/g, "");
    return parseFloat(rawValue).toLocaleString("en-IN");
  }
  return value;
};


export const convertBigIntId = (jsonDetails) => {
  const data = jsonDetails.map((details) => {
    return { ...details, id: details.id.toString() };
  });
  return data;
};
