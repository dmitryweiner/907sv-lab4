import React, { ChangeEvent, FormEvent, useState } from 'react';
import { addItem } from '../../store';
import { useDispatch } from 'react-redux';

export default function Form() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  function innerSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(addItem(value));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);
  }

  return (
    <>
      <form data-testid="form" onSubmit={innerSubmit}>
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
