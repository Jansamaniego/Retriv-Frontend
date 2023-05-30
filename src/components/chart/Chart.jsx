import { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Chart = ({ chart, chartData, title, label, dataPoint }) => {
  const [userData, setUserData] = useState({
    labels: chartData.map((data) => data[label]),
    datasets: [
      {
        label: title,
        data: chartData.map((data) => data[dataPoint]),
        backgroundColor: ['#88a2aa'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  return chart === 'pie' ? (
    <Pie data={userData} />
  ) : chart === 'line' ? (
    <Line data={userData} />
  ) : (
    <Bar data={userData} />
  );
};

export default Chart;
