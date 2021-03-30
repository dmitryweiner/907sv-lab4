import { createSelector } from 'reselect';
import { Store } from '../store/reducers';

export const getSearchFilteredItems = createSelector(
  (state: Store) => state.todo.search,
  (state: Store) => state.todo.items,
  (search, items) =>
    items.filter(element => element.value.toUpperCase().indexOf(search.toUpperCase()) != -1)
);
