import React, { ChangeEvent, FormEvent, useState } from 'react';

type HandleSubmit = {
  handleSubmit: (value: string) => void;
};

export default function Form({ handleSubmit }: HandleSubmit) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function innerSubmit(e: FormEvent) {
    e.preventDefault();

    if (value === '') {
      setErrorMessage('Введите текст, пожалуйста');
    } else {
      handleSubmit(value);
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
