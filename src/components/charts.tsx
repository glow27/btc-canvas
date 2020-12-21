import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import Spinner from './spinner';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Charts: React.FC = () => {
  const [options1, setOptions1] = useState<any>();
  const [points1, setPoints1] = useState<any>();
  const [options2, setOptions2] = useState<any>();
  const [points2, setPoints2] = useState<any>();

  useEffect(() => {
    (async () => {
      const response = await Promise.all([
        fetch(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily'
        ),
        fetch(
          'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14&interval=daily'
        ),
      ]);

      const result = await Promise.all([
        response[0].json(),
        response[1].json(),
      ]);
      setPoints1(
        result[0].prices.map((element: number[]) => {
          return {
            x: new Date(element[0]),
            y: element[1],
          };
        })
      );
      setPoints2(
        result[1].prices.map((element: number[]) => {
          return {
            x: new Date(element[0]),
            y: element[1],
          };
        })
      );
    })();
  }, []);

  useEffect(() => {
    setOptions1({
      animationEnabled: true,
      title: {
        text: 'BTC/USD',
      },
      axisX: {
        valueFormatString: 'DD MMM',
      },
      axisY: {
        maximum: 21000,
        minimum: 12000,
        prefix: '$',
      },
      data: [
        {
          yValueFormatString: '$#,###',
          xValueFormatString: 'DD MMM',
          type: 'spline',
          dataPoints: points1,
        },
      ],
    });
    setOptions2({
      animationEnabled: true,
      title: {
        text: 'ETH/USD',
      },
      axisX: {
        valueFormatString: 'DD MMM',
      },
      axisY: {
        maximum: 650,
        minimum: 350,
        prefix: '$',
      },
      data: [
        {
          yValueFormatString: '$#,###',
          xValueFormatString: 'DD MMM',
          type: 'spline',
          dataPoints: points2,
        },
      ],
    });
  }, [points1, points2]);

  return (
    <>
      <div className="charts">
        <div className="charts__item">
          {points1 ? <CanvasJSChart options={options1} /> : <Spinner />}
        </div>
        <div className="charts__item">
          {points2 ? <CanvasJSChart options={options2} /> : <Spinner />}
        </div>
      </div>
    </>
  );
}

export default Charts;
