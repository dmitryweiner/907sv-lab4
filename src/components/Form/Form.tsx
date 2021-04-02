import React, { FormEvent, useState } from 'react';
import './Form.css';
import { add, Store } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {
  const [field, setField] = useState('');
  const [emptyFieldErrorMessage, setEmptyFieldErrorMessage] = useState('');
  const [existingFieldErrorMessage, setExistingFieldErrorMessage] = useState('');
  const dispatch = useDispatch();
  const titles = useSelector((state: Store) => state.list.map(element => element.title));

  function handleSubmitInner(e: FormEvent) {
    e.preventDefault();
    if (field !== '' && !titles.includes(field)) {
      dispatch(add(field));
      setField('');
      setEmptyFieldErrorMessage('');
      setExistingFieldErrorMessage('');
    } else if (field === '') {
      setEmptyFieldErrorMessage('Поле не должно быть пустым!');
      setExistingFieldErrorMessage('');
    } else {
      setEmptyFieldErrorMessage('');
      setExistingFieldErrorMessage('Нельзя добавить поле с уже существующим именем!');
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
