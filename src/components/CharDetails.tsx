import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';

import * as echarts from 'echarts';
import { useRouter } from 'next/router';
import axios from 'axios';

import APIDetails from '../mock/simulation.json';

const CharDetails = (): ReactElement => {
  const { query } = useRouter();
  const [details, setDetails] = useState([]);
  const myEChart = useRef(null);
  let chart;

  const option = () => {
    const data = details.map((d) => {
      return [d.timestamp, d.netGain];
    });
    return {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      title: {
        left: 'center',
        text: 'CHART DETAILS'
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 20
        },
        {
          start: 0,
          end: 20
        }
      ],
      series: [
        {
          name: 'Details Data',
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {},
          data: data
        }
      ]
    };
  };

  useEffect(() => {
    chart = echarts.getInstanceByDom(myEChart.current);
    if (chart) {
      chart.resize();
    } else {
      chart = echarts.init(myEChart.current);
    }
    chart.setOption(option());
    window.addEventListener('resize', () => chart.resize());
  }, [option]);

  const fetchList = () => {
    // TODO BRUNO, metti l'url della chiamata api
    axios
      .get('http://localhost:3000/api/v1/simulation_statistics') // <--- DA CAMBIARE !!!
      .then(({ data }) => {
        // setNetGain(data.netGain); // TODO: da decommentare quando use il vero endpoint
        // setTimestamp(data.timestamp);
      })
      .catch((error) => {
        setDetails(APIDetails);
        // alert(error?.message || 'Errore chiamata lista api');
      });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Stack sx={{ height: 600 }}>
      <h3>Details: {query.listid}</h3>
      <div
        ref={myEChart}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </Stack>
  );
};

export default CharDetails;
