import React from "react";
import { Pie } from "react-chartjs-2";

const colors = ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"];

const PieChart = ({ labels, data }: { labels: string[]; data: number[] }) => {
  return (
    <Pie
      data={{
        labels: labels,
        datasets: [
          {
            label: "Total Deths",
            data: data,
            backgroundColor: data.map((x, i) => colors[i % 3]),
            hoverOffset: 4,
          },
        ],
      }}
      width={75}
      height={75}
    />
  );
};

export default PieChart;
