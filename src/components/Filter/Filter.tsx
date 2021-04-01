import React from 'react';
import { ACTION_TYPES, SELECTOR_TYPES, Store } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function Filter() {
  const options = [SELECTOR_TYPES.ALL, SELECTOR_TYPES.DONE, SELECTOR_TYPES.NOT_DONE];
  const searchBar = useSelector((state: Store) => state.searchBar);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <label>
          Фильтр:
          <input
            type="text"
            data-testid="search-bar"
            value={searchBar}
            onChange={e => dispatch({ type: ACTION_TYPES.SEARCH, payload: e.target.value })}
          />
        </label>
        {options.map(item => (
          <a key={item} onClick={() => dispatch({ type: ACTION_TYPES.FILTER, payload: item })}>
            {item}{' '}
          </a>
        ))}
      </div>
    </>
  );
}
