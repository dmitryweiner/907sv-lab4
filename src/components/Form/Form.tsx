import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ACTION_TYPES } from '../../store';
import { useDispatch } from 'react-redux';

export default function Form() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function innerSubmit(e: FormEvent) {
    e.preventDefault();

    if (value === '') {
      setErrorMessage('Введите текст, пожалуйста');
    } else {
      dispatch({
        type: ACTION_TYPES.ADD,
        payload: value
      });
      setErrorMessage('');
    }
    setValue('');
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);
  }

  return (
    <form data-testid="form" onSubmit={innerSubmit}>
      <div className="errorMessage">{errorMessage}</div>
      <div>
        <input data-testid="input" type="text" value={value} onChange={handleChange} />
        <br />
        <button data-testid="handleSubmit" type="submit" className="addBtn">
          Добавить
        </button>
      </div>
    </form>
  );
}
