import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ProfileChart from './profileChart';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  money: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [eth, setEth] = useState(24);
  const [btc, setBtc] = useState(2);
  const [ethInput, setEthInput] = useState('');
  const [btcInput, setBtcInput] = useState('');

  const handlePlus = (val) => {
    if (val === 'eth') {
      setEth(eth + +ethInput);
      setEthInput('');
    }
    if (val === 'btc') {
      setBtc(btc + +btcInput);
      setBtcInput('');
    }
  };

  const handleMinus = (val) => {
    if (val === 'eth') {
      if (eth - +ethInput < 0) {
        setEth(0);
        setEthInput('');
      } else {
        setEth(eth - +ethInput);
        setEthInput('');
      }
    }
    if (val === 'btc') {
      if (btc - +btcInput < 0) {
        setBtc(0);
        setBtcInput('');
      } else {
        setBtc(btc - +btcInput);
        setBtcInput('');
      }
    }
  };

  return (
    <>
      <ProfileChart eth={eth} btc={btc} />
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        <Divider />
        <ListItem className={classes.money}>
          <div className={classes.name}>Bitcoins = {btc}</div>

          <ButtonGroup size="small" aria-label="small outlined button group">
            <TextField
              className={classes.formControl}
              id="outlined-basic1"
              label="amount"
              variant="outlined"
              value={btcInput}
              onChange={(e) => {
                setBtcInput(e.target.value);
              }}
            />
            <Button onClick={() => handlePlus('btc')}>+</Button>
            <Button onClick={() => handleMinus('btc')}>-</Button>
          </ButtonGroup>
        </ListItem>
        <Divider />
        <ListItem className={classes.money}>
          <div className={classes.name}>Ethereum = {eth}</div>

          <ButtonGroup size="small" aria-label="small outlined button group">
            <TextField
              className={classes.formControl}
              id="outlined-basic2"
              label="amount"
              variant="outlined"
              value={ethInput}
              onChange={(e) => {
                setEthInput(e.target.value);
              }}
            />
            <Button onClick={() => handlePlus('eth')}>+</Button>
            <Button onClick={() => handleMinus('eth')}>-</Button>
          </ButtonGroup>
        </ListItem>
        <Divider />
      </List>
    </>
  );
}
