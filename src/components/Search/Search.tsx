import React, { ChangeEvent } from 'react';
import { SEARCH } from '../../store/actions/todoAction';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../store/reducers';

function Search() {
  const searchString = useSelector((state: Store) => state.todo.search);
  const dispatch = useDispatch();
  function inputHandler(event: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: SEARCH,
      payload: event.target.value
    });
  }

  return <input data-testid="search" value={searchString} onChange={inputHandler} />;
}

export default Search;
