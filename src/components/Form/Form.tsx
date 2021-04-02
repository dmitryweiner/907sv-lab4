import React, { FormEvent, useState } from 'react';
import './Form.css';
import { add } from '../../store';
import { useDispatch } from 'react-redux';

export default function Form() {
  const [field, setField] = useState('');
  const [emptyFieldErrorMessage, setEmptyFieldErrorMessage] = useState('');
  const [existingFieldErrorMessage, setExistingFieldErrorMessage] = useState('');
  const dispatch = useDispatch();

  function handleSubmitInner(e: FormEvent) {
    e.preventDefault();
    if (field !== '') {
      dispatch(add(field));
      setField('');
      setEmptyFieldErrorMessage('');
      setExistingFieldErrorMessage('');
    } else {
      setEmptyFieldErrorMessage('Поле не должно быть пустым!');
    }
  }

  return (
    <>
      <form data-testid="form" onSubmit={handleSubmitInner}>
        <input data-testid="input" value={field} onChange={e => setField(e.target.value)} />
        <button data-testid="button" type="submit">
          Добавить
        </button>
        <div className="errorMessage">{emptyFieldErrorMessage}</div>
        <div className="errorMessage">{existingFieldErrorMessage}</div>
      </form>
    </>
  );
}
