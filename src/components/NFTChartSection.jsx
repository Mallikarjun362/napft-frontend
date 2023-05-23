import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

const NFTChartSection = ({ timeline }) => {
  // const data = [
  //   { x: "2010-01-01", y: 10 },
  //   { x: "2011-01-01", y: 20 },
  //   { x: "2012-01-01", y: 25 },
  //   { x: "2013-01-01", y: 15 },
  //   { x: "2014-01-01", y: 26 },
  //   { x: "2015-01-01", y: 35 },
  //   { x: "2017-01-01", y: 30 },
  //   { x: "2018-01-01", y: 35 },
  //   { x: "2019-01-01", y: 40 },
  // ];
  let data;
  timeline.sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });
  const date_options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    separator: '-',
  };
  data = timeline.map((ele) => ({
    y: ele.price,
    x: new Date(ele.timestamp)
      .toLocaleDateString('en-GB', date_options)
      .replace(/\//g, '-'),
  }));
  const yls = data.map((a) => a.y);
  const mn = yls.reduce((a, b) => a + b, 0) / yls.length / 3;
  const options = {
    scales: {
      x: {
        ticks: {
          color: '#fff7',
        },
        grid: {
          color: '#fff4',
          borderColor: 'red',
        },
      },
      y: {
        min: Math.min(...yls) - mn,
        max: Math.max(...yls) + mn,
        ticks: {
          color: '#fff7',
          // stepSize:1,
        },
        grid: {
          color: '#fff4',
          borderColor: 'green', // <-- this line is answer to initial question
        },
        title: {
          display: true,
          text: 'Price in ETH',
          color: '#fff',
        },
      },
    },
  };

  const chartData = {
    datasets: [
      {
        label: 'Price',
        data: data.map((d) => ({ x: d.x, y: d.y })),
      },
    ],
  };
  return (
    <div
      style={{
        color: 'black',
        height: '500px',
        backgroundColor: '#fff2',
        borderRadius: '20px',
        padding: '20px',
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default NFTChartSection;
