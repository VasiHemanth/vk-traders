// LineChart.js
"use client";
import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { numberWithCommas } from "@/app/utils/helper";

const LineChartTo = ({ chartData }) => {
  // Sample data for the chart

  const data = {
    labels: chartData && chartData.labels,
    datasets: [
      {
        label: chartData && chartData.column,
        data: chartData && chartData.values,
        fill: true,
        backgroundColor: "rgb(25,72,122, 0.2)",
        borderColor: "rgba(25,72,122,1)",
        datalabels: {
          display: true,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: true },
        title: {
          display: true,
          text:
            chartData && chartData.column === "quantity"
              ? "Quantity in tons"
              : "Amount in (₹)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          callback: function (value) {
            if (chartData && chartData.column === "quantity") {
              return `${value}`;
            } else {
              return `${numberWithCommas(value)}`;
            }
          },
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        align: "top",
        labels: {
          title: {
            font: {
              weight: "normal",
            },
          },
        },
        font: {
          size: 14,
        },

        formatter: function (value) {
          if (chartData && chartData.column === "quantity") {
            return `${value} tons`;
          } else {
            return `₹${numberWithCommas(value)}`;
          }
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.dataset.label === "quantity") {
              return `Quantity: ${context.parsed.y} tons`;
            } else if (context.dataset.label === "balance_amount") {
              return `Balance Amount: ₹${numberWithCommas(context.parsed.y)}`;
            } else if (context.dataset.label === "maintanance") {
              return `Maintanance: ₹${numberWithCommas(context.parsed.y)}`;
            }
          },
        },
      },
    },
  };

  const plugins = [ChartDataLabels];

  return <Line data={data} options={options} plugins={plugins} />;
};

export default LineChartTo;
