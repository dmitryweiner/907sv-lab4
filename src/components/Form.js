import React, { useState } from 'react';

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
