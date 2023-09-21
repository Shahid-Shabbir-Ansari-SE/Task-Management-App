import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

const MyChart = () => {
  let base = +new Date(1968, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let date = [];
  let data = [Math.random() * 300];
  for (let i = 1; i < 20000; i++) {
    var now = new Date((base += oneDay));
    date.push([[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')]);
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: data
      }
    ]
  };

  return (
    <div className="w-[100vw] lg:w-[calc(100vw-255px)] md:w-[calc(100vw-255px)] h-screen items-center grid">
      <h1 className="text-center fixed lg:w-[calc(100vw-255px)] md:w-[calc(100vw-255px)] w-[100vw] top-40 dark:text-white">Area Chart</h1>
      <ReactECharts option={option} />
    </div>
  );
};

export default MyChart;
