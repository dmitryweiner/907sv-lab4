import React, { FormEvent } from 'react';
import { Action, ACTION_TYPES } from '../Store';

type FormProps = {
  dispatch: (action: Action) => void;
  isFilterDone: boolean;
  filterHandler: () => void;
};

function Form({ dispatch, isFilterDone = false, filterHandler = () => {} }: FormProps) {
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
    <div className="formWrapper">
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
        <br />
        <input
          type="checkbox"
          data-testid="filterCheckbox"
          checked={isFilterDone}
          onChange={filterHandler}
        />
        {' show only done deeds '}
        <br />
        <div className="errorMessage">{errorMessage}</div>
      </form>
    </div>
  );
}
export default Form;
