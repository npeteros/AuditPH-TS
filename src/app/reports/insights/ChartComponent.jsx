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

    const chartOptions = {
        maintainAspectRatio: false
    }

    return <Bar data={chartData} className='h-64' options={chartOptions} />;
};

export default ChartComponent;