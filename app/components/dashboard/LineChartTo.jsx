// LineChart.js
"use client";
import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChartTo = () => {
  // Sample data for the chart
  const data = {
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    datasets: [
      {
        label: "Quantity",
        data: [390, 410, 397, 500, 480, 485],
        fill: true,
        backgroundColor: "rgb(25,72,122, 0.2)",
        borderColor: "rgba(25,72,122,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChartTo;
