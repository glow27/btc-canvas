import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import Spinner from './spinner';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type PointsType = {
  x: Date;
  y: number;
};

type OptionsType = {
  animationEnabled: boolean;
  title: {
    text: string;
  };
  axisX: {
    valueFormatString: string;
  };
  axisY: {
    maximum: number;
    minimum: number;
    prefix: string;
  };
  data: [
    {
      yValueFormatString: string;
      xValueFormatString: string;
      type: string;
      dataPoints: PointsType[] | undefined;
    }
  ];
};

type MinMaxType = {
  min: number;
  max: number;
};

const Charts: React.FC = () => {
  const [options1, setOptions1] = useState<OptionsType>();
  const [points1, setPoints1] = useState<Array<PointsType>>([
    { x: new Date(), y: 100000 },
  ]);
  const [options2, setOptions2] = useState<OptionsType>();
  const [points2, setPoints2] = useState<Array<PointsType>>([
    { x: new Date(), y: 100000 },
  ]);
  const [ethMinMax, setEthMinMax] = useState<MinMaxType>({
    min: 100,
    max: 1000,
  });
  const [btcMinMax, setBTCMinMax] = useState<MinMaxType>({
    min: 1000,
    max: 100000,
  });

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
    const eth = points2
      .slice()
      .sort((a: PointsType, b: PointsType) => a.y - b.y);
    setEthMinMax({ min: eth[0].y, max: eth[eth.length - 1].y });
    const btc = points1
      .slice()
      .sort((a: PointsType, b: PointsType) => a.y - b.y);
    setBTCMinMax({ min: btc[0].y, max: btc[btc.length - 1].y });

    setOptions1({
      animationEnabled: true,
      title: {
        text: 'BTC/USD',
      },
      axisX: {
        valueFormatString: 'DD MMM',
      },
      axisY: {
        maximum: btcMinMax.max + 2000,
        minimum: btcMinMax.min - 2000,
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
        maximum: ethMinMax.max + 100,
        minimum: ethMinMax.min - 100,
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
  }, [
    points1,
    points2,
    ethMinMax.min,
    ethMinMax.max,
    btcMinMax.max,
    btcMinMax.min,
  ]);

  return (
    <>
      <div className="charts">
        <div className="charts__item">
          {points1.length > 1 ? (
            <CanvasJSChart options={options1} />
          ) : (
            <Spinner />
          )}
        </div>
        <div className="charts__item">
          {points2.length > 1 ? (
            <CanvasJSChart options={options2} />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
};

export default Charts;
