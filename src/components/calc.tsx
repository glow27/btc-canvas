import React, { useContext, useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { DataContext } from './main';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Calc: React.FC = () => {
  const classes = useStyles();
  const [currency1, setCurrency1] = useState('btc');
  const [currency2, setCurrency2] = useState('usd');
  const [value1, setValue1] = useState('1');
  const [display, setDisplay] = useState(1);
  const data = useContext(DataContext);

  useEffect(() => {
    if (currency1 === 'btc') {
      return setDisplay(data['bitcoin'][currency2] * +value1);
    } else if (currency1 === 'eth') {
      return setDisplay(data['ethereum'][currency2] * +value1);
    } else {
      return setDisplay(data['busd'][currency2] * +value1);
    }
  }, [value1, currency1, currency2, data]);

  return (
    <>
      <div className="calc">
        <div className="table">
          <TextField
            className={classes.formControl}
            id="outlined-basic"
            label="amount"
            variant="outlined"
            value={value1}
            onChange={(e) => {
              setValue1(e.target.value);
            }}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              currency
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={currency1}
              onChange={(e: React.ChangeEvent<{ value: unknown }>): void => {
                setCurrency1(e.target.value as string);
              }}
              label="currency"
            >
              <MenuItem value={'btc'}>bitcoin</MenuItem>
              <MenuItem value={'eth'}>ethereum</MenuItem>
            </Select>
          </FormControl>
          <h4>to</h4>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              currency
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={currency2}
              onChange={(e: React.ChangeEvent<{ value: unknown }>): void => {
                setCurrency2(e.target.value as string);
              }}
              label="currency"
            >
              <MenuItem value={'btc'}>bitcoin</MenuItem>
              <MenuItem value={'eth'}>etherum</MenuItem>
              <MenuItem value={'usd'}>usd</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="result">
          <h5>
            {value1} {currency1} equals
          </h5>{' '}
          <h2>
            {' '}
            {currency2 === 'usd' ? display.toFixed(2) : display} {currency2}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Calc;
