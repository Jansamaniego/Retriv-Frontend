import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const RatingsQuantityPerRatingScoreChart = ({ chartData }) => {
  const writableData = [...chartData];

  let dataArray = [];
  let index = 0;

  for (let i = 0; i < 5; i++) {
    if (writableData[index] && writableData[index].ratingsScore === i + 1) {
      dataArray.push({
        ratingsScore: writableData[index].ratingsScore,
        ratingsQuantity: writableData[index].ratingsQuantity,
      });
      index++;
    } else {
      dataArray.push({
        ratingsScore: i + 1,
        ratingsQuantity: 0,
      });
    }
  }

  const [userData, setUserData] = useState({
    labels: dataArray.map((data) => data.ratingsScore),
    datasets: [
      {
        label: 'Ratings per rating score',
        data: dataArray.map((data) => data.ratingsQuantity),
        backgroundColor: ['#88a2aa'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  const dataRatingPoints = dataArray.map((data) => data.ratingsQuantity);

  const options = {
    scales: {
      y: {
        max: Math.max(...dataRatingPoints) + 1,
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={userData} options={options} />;
};

export default RatingsQuantityPerRatingScoreChart;
