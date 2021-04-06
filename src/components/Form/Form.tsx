import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ACTION_TYPES, Store } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const list = useSelector((state: Store) => state.list);

  function checkValueForExistence() {
    return list.some(item => item.title === value);
  }

  async function innerSubmit(e: FormEvent) {
    e.preventDefault();

    if (value === '') {
      return setErrorMessage('Введите текст, пожалуйста');
    }

    if (checkValueForExistence()) {
      return setErrorMessage('Задача уже имеется');
    }

    let data = { title: value };
    const url = 'http://localhost:3001/todos';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    console.log(json);

    dispatch({
      type: ACTION_TYPES.ADD,
      payload: value
    });

    setErrorMessage('');
    setValue('');
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);
  }

  return (
    <>
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
    </>
  );
}
