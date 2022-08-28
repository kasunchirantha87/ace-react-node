import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);


const colors = ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"];
const boarderColors = ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"];

const BarChart = ({ labels, data }: { labels: string[]; data: number[] }) => {
  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            label: "COVID-19 Deaths",
            data: data,
            backgroundColor: data.map((x, i) => colors[i % 3]),
            borderColor:data.map((x, i) => boarderColors[i % 3]),
            borderWidth: 1,
          },
        ],
      }}
      height={350}
          width={350}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
    />
  );
};


export default BarChart;