import React from 'react';
import { SELECTOR_TYPES, Store, search, filter } from '../../store';
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
            onChange={e => dispatch(search(e.target.value))}
          />
        </label>
        {options.map(item => (
          <a key={item} onClick={() => dispatch(filter(item))}>
            {item}{' '}
          </a>
        ))}
      </div>
    </>
  );
}
