"use client";

import Chart from "react-apexcharts";

export default function Graph({ id = "graph", type = "line", xaxis, series }) {
  const data = {
    options: {
      chart: {
        id,
      },
      xaxis,
    },
    series,
  };

  return (
    <Chart
      options={data.options}
      series={data.series}
      type={type}
      width="100%"
    />
  );
}
