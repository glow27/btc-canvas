import React, { useEffect, useState } from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Calc from './calc';
import Charts from './charts';
import Profile from './profile';
import { createContext } from 'react';

export const DataContext = createContext<{
  ethereum: { [key: string]: number; btc: number; eth: number; usd: number };
  bitcoin: { [key: string]: number;btc: number; eth: number; usd: number };
  busd: { [key: string]: number;btc: number; eth: number; usd: number };
}>({
  ethereum: { btc: 0.02718889, eth: 1.0, usd: 496.78 },
  bitcoin: { btc: 1.0, eth: 36.794218, usd: 18265.5 },
  busd: { btc: 5.463e-5, eth: 0.00201068, usd: 0.998221 },
});

type TabPanelProps = {
  value: number;
  index: number;
};

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number): { id: string; 'aria-controls': string } {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SimpleTabs: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [data, setData] = useState({
    ethereum: { btc: 0.02718889, eth: 1.0, usd: 496.78 },
    bitcoin: { btc: 1.0, eth: 36.794218, usd: 18265.5 },
    busd: { btc: 5.463e-5, eth: 0.00201068, usd: 0.998221 },
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=busd%2Cethereum%2Cbitcoin&vs_currencies=btc%2Ceth%2Cusd'
      );
      const result = await response.json();
      setData(result);
    })();
  }, []);

  const handleChange = (event: object, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Your assets" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <DataContext.Provider value={data}>
        <TabPanel value={value} index={0}>
          <Calc />
          <Charts />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Profile />
        </TabPanel>
      </DataContext.Provider>
    </div>
  );
};

export default SimpleTabs;
