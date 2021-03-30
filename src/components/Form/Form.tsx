import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ACTION_TYPES, Store } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const list = useSelector((state: Store) => state.list);

  function checkValueForUniqueness() {
    let isUnique = true;

    list.map(item => {
      if (item.title === value) isUnique = false;
    });

    return isUnique;
  }

  function innerSubmit(e: FormEvent) {
    e.preventDefault();

    if (value === '') {
      setErrorMessage('Введите текст, пожалуйста');
    } else {
      if (checkValueForUniqueness()) {
        dispatch({
          type: ACTION_TYPES.ADD,
          payload: value
        });

        setErrorMessage('');
        setValue('');
      } else {
        setErrorMessage('Задача уже имеется');
      }
    }
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
