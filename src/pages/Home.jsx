import React from 'react';
import Chart from '../components/chart/Chart';

const chartData = [
  {
    id: 1,
    year: 2016,
    productsSold: 21,
  },
  {
    id: 2,
    year: 2017,
    productsSold: 12,
  },
  {
    id: 3,
    year: 2018,
    productsSold: 34,
  },
  {
    id: 4,
    year: 2019,
    productsSold: 6,
  },
  {
    id: 5,
    year: 2020,
    productsSold: 23,
  },
  {
    id: 6,
    year: 2021,
    productsSold: 41,
  },
];

const Home = () => {
  console.log('hello');
  return (
    <>
      <Chart
        chart="bar"
        chartData={chartData}
        title="Products Sold per Year"
        label="year"
        dataPoint="productsSold"
      />
    </>
  );
};

export default Home;
