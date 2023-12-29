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
        backgroundColor: "rgba(0,71,171, 0.2)",
        borderColor: "rgba(0,71,171,1)",
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
