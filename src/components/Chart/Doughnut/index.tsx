import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IDatasets {
  label: string;
  data: number[];
  backgroundColor: string[];
  hoverOffset?: number;
  borderWidth?: number;
}

interface IDataChart {
  labels: string[];
  datasets: IDatasets[];
}

interface IChart {
  data: IDataChart;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart Canteen",
    },
  },
};

const DoughnutChart = ({ data }: IChart) => {
  return (
    <div className="w-full">
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
