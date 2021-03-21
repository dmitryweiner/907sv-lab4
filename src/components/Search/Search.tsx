import React, { ChangeEvent } from 'react';
import { SEARCH } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { ListI } from '../../store/interfaces/listInterface';

function Search() {
  const searchString = useSelector((state: ListI) => state.search);
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
