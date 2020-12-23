import React, { useContext, useEffect, useState } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { DataContext } from './main';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type Props = {
  eth: number;
  btc: number;
};

const ProfileChart: React.FC<Props> = ({ eth, btc }) => {
  const data = useContext(DataContext);
  const [usd, setUsd] = useState(
    eth * data['ethereum']['usd'] + btc * data['bitcoin']['usd']
  );

  const [ethPercent, setEthPercent] = useState(
    ((eth * data['ethereum']['usd']) / usd) * 100
  );
  const [btcPercent, setBtcPercent] = useState(
    ((btc * data['bitcoin']['usd']) / usd) * 100
  );

  useEffect(() => {
    setEthPercent(((eth * data['ethereum']['usd']) / usd) * 100);
    setBtcPercent(((btc * data['bitcoin']['usd']) / usd) * 100);
    setUsd(eth * data['ethereum']['usd'] + btc * data['bitcoin']['usd']);
  }, [eth, btc, usd, data]);

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: 'Your assets value (USD)',
    },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}%',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}%',
        dataPoints: [
          { y: ethPercent.toFixed(2), label: 'Ethereum' },
          { y: btcPercent.toFixed(2), label: 'Bitcoin' },
        ],
      },
    ],
  };

  return (
    <>
      <div className="profile">
        <div className="profile__info">
          <h3>Your assets:</h3>

          <p>
            {eth} Ethereum = {(eth * data['ethereum']['usd']).toFixed(2)}{' '}
            dollars
          </p>
          <p>
            {btc} Bitcoin = {(btc * data['bitcoin']['usd']).toFixed(2)} dollars
          </p>
          <hr></hr>
          <p> {usd.toFixed(2)} dollars total!!!</p>
        </div>
        <CanvasJSChart options={options} />
      </div>
    </>
  );
};

export default ProfileChart;
