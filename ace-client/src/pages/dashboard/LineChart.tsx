import React from "react";

import { Line } from "react-chartjs-2";


const LineChart = ({ labels, data }: { labels: string[]; data: number[] }) => {

  const lineChartdata = {
    labels: labels,
    datasets: [
      {
        label: "COVID-19 Recoverd",
        data: data,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      }
    ]
  };
  

    return(
        <div>
          <Line data={lineChartdata} />
        </div>
    );
}

export default LineChart;