import { createSelector } from 'reselect';
import { Store } from '../store/reducers';

const getSearchFilter = (state: Store) => state.todo.search;
const getTodoItems = (state: Store) => state.todo.items;

export const getSearchFilteredItems = createSelector(
  getSearchFilter,
  getTodoItems,
  (search, items) =>
    items.filter(element => element.value.toUpperCase().indexOf(search.toUpperCase()) != -1)
);
