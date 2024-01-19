export const tripMetrics = [
  { label: "Reading", value: "NA" },
  { label: "Kilometers", value: "NA" },
  { label: "Diesel", value: "NA" },
  { label: "Diesel Amount", value: "NA" },
  { label: "AdBlue", value: "NA" },
  { label: "Mileage", value: "NA" },
];

export const OrderDetailsData = [
  { label: "Grade", value: "NA" },
  { label: "Quantity", value: "NA" },
  { label: "From", value: "NA" },
  { label: "To", value: "NA" },
  { label: "Shipment Number", value: "NA" },
  { label: "Party Name", value: "NA" },
  { label: "Advance", value: "NA" },
];

export const OrderSubmitData = [
  { label: "Grade", value: "NA" },
  { label: "Quantity", value: "NA" },
  { label: "From", value: "NA" },
  { label: "To", value: "NA" },
  { label: "Shipment Number", value: "NA" },
  { label: "Party Name", value: "NA" },
  { label: "Advance", value: "NA" },
  { label: "Loading", value: "NA" },
  { label: "UnLoading", value: "NA" },
  { label: "Toll Gate", value: "NA" },
  { label: "RTO & PC", value: "NA" },
  { label: "Freight", value: "NA" },
  { label: "Expenses", value: "NA" },
  { label: "Freight Amount", value: "NA" },
  { label: "Driver Amount", value: "NA" },
  { label: "Balance Amount", value: "NA" },
];


export const allTripsOverview = {
  column_names: ['DATE', 'FROM', 'TO', 'QTY', 'ADVANCE', 'LOADING', 'UNLOADING', 
  'RTO & PC', 'TOLLGATE', 'READING', 'KMS', 'DIESEL', 'DIESEL AMT', 'ADBLUE',
  'TOTAL EXPENSES', 'MILEAGE', 'FREIGHT', 'FRIEGHT AMT', 'DRIVER AMT',
  'DRIVER AVG', 'GST',  'BALANCE AMT'
  ],
  column_values: [
    {
      'date': '01.08.23',
      "fromLocation": "Zuari",
      "toLocation": "Anapurna Base Camp (Nepal)",
      "quantity": "42",
      "advance": "4500",
      "loading": "700",
      "unloading": "1050",
      "tollGate": "1700",
      "pclRto": "600",
      "reading": "1933",
      "tripDistance": "1042",
      "dieselLitres": "315.18",
      "dieselPerLitre": "99.82",
      "dieselAmount": "31461.27",
      "mileage": "3.31",
      "adBlue": "1024",
      "totalExpenses": "4050",
      "freight": "900",
      "freightAmount": 45000,
      "driverFreight": "880",
      "driverAmount": "4840",
    },
  ]
}