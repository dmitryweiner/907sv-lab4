import { createSelector } from 'reselect';
import { Store } from '../reducers';

const getSearchFilter = (state: Store) => state.todo.search;
const getTodoItems = (state: Store) => state.todo.items;

export const getSearchFilteredItems = createSelector(
  getSearchFilter,
  getTodoItems,
  (search, items) =>
    items.filter(element => element.title.toUpperCase().indexOf(search.toUpperCase()) != -1)
);
