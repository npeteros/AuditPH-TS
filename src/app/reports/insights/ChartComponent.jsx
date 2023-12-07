import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto"

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.budgetType),
    datasets: [
      {
        label: 'Total Expenditures',
        data: data.map(item => item.sum),
        backgroundColor: '#ff3200',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ChartComponent;