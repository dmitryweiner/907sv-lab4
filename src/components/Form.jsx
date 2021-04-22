import React, { useState } from 'react';
import AddButton from './Design/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

export default function Form({ handleSubmit }) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function innerSubmit(e) {
    e.preventDefault();

    if (value === '') {
      setErrorMessage('Введите текст, пожалуйста');
    } else {
      handleSubmit(value);
      setErrorMessage('');
    }
    setValue('');
  }

  function handleChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
  }

  function Input() {
    const classes = useStyles();

    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Задача:"
          variant="outlined"
          data-testid="input"
          value={value}
          onChange={handleChange}
        />
      </form>
    );
  }

  return (
    <form data-testid="form" onSubmit={innerSubmit}>
      <div className="errorMessage">{errorMessage}</div>
      <div>
        <Input />
        <br />
        <AddButton />
      </div>
    </form>
  );
}
