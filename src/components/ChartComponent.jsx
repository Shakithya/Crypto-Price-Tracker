import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ChartComponent = ({ chartData, coinName }) => {
  const data = {
    labels: chartData.map((data) => new Date(data[0]).toLocaleDateString()),
    datasets: [
      {
        label: `${coinName} Price`,
        data: chartData.map((data) => data[1]),
        fill: false,
        borderColor: '#1976d2',
        tension: 0.2,
      },
    ],
  };

  return <Line data={data} />;
};

export default ChartComponent;
