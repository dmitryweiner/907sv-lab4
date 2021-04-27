import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { ACTION_TYPES } from '../../store/actions';

function Form() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  function innerSubmit(e: FormEvent) {
    e.preventDefault();
    if (inputValue === '') {
      setErrorMessage('Enter something first (￢_￢;)');
    } else {
      setErrorMessage('');
      setInputValue('');
      return dispatch({ type: ACTION_TYPES.ADD, payload: inputValue });
    }
  }

  return (
    <div>
      <form onSubmit={innerSubmit}>
        <input
          id="formInput"
          type="text"
          placeholder="Enter a deed"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button id="formAddButton" data-testid="I'm addButton" type="submit">
          Add a deed
        </button>
        <div className="errorMessage">{errorMessage}</div>
      </form>
    </div>
  );
}
export default Form;
