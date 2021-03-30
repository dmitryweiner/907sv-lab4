import { createSelector } from 'reselect';
import { ListI } from '../store/interfaces/listInterface';

export const getSearchFilteredItems = createSelector(
  (state: ListI) => state.search,
  (state: ListI) => state.items,
  (search, items) =>
    items.filter(element => element.value.toUpperCase().indexOf(search.toUpperCase()) != -1)
);
