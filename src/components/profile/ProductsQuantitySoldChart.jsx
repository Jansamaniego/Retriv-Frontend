import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart as ChartJS } from 'chart.js/auto';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ProductsQuantitySoldChart = ({ chartData }) => {
  const writableData = [...chartData];

  let index = 0;

  let dataArray = [];

  for (let i = 0; i < 12; i++) {
    const dateNow = new Date();
    const newDate = new Date(dateNow.setMonth(dateNow.getMonth() - i, 1));
    const convertedDate = new Date(writableData[index].date);
    if (
      newDate.getMonth() === convertedDate.getMonth() &&
      newDate.getFullYear() === convertedDate.getFullYear()
    ) {
      dataArray.push({
        date: convertedDate,
        productsSold: writableData[index].productsSold,
      });
      index++;
    } else {
      dataArray.push({
        date: newDate,
        productsSold: 0,
      });
    }
  }

  const reversedDataArray = dataArray.reverse();

  const [userData, setUserData] = useState({
    labels: reversedDataArray.map(
      (data) => `${MONTHS[data.date.getMonth()]} ${data.date.getFullYear()}`
    ),
    datasets: [
      {
        label: 'Products sold per month',
        data: reversedDataArray.map((data) => data.productsSold),
        backgroundColor: ['#88a2aa'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  return <Line data={userData} options={{ aspectRatio: 3.5 / 1 }} />;
};

export default ProductsQuantitySoldChart;
