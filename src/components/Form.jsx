import React, { useState } from 'react';
import AddButton from './Design/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { ACTION_TYPES } from '../store';

export default function Form() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function innerSubmit(e) {
    e.preventDefault();

    if (value === '') {
      setErrorMessage('Введите текст, пожалуйста');
    } else {
      dispatch({ type: ACTION_TYPES.ADD, payload: value });
      setErrorMessage('');
    }
    setValue('');
  }

  function handleChange(e) {
    e.preventDefault();
    const newValue = e.target.value;
    setValue(newValue);
  }

  return (
    <form data-testid="form" onSubmit={innerSubmit}>
      <div className="errorMessage">{errorMessage}</div>
      <div>
        <TextField
          id="outlined-basic"
          label="Задача"
          variant="outlined"
          inputProps={{ 'data-testid': 'input' }}
          onChange={handleChange}
          value={value}
        />
        <br />
        <AddButton />
      </div>
    </form>
  );
}
