import { createSelector } from 'reselect';
import { getSearchFilteredItems } from './getSearchFilteredItems';
import { Store } from '../store/reducers';

export const getSelectFilteredList = createSelector(
  getSearchFilteredItems,
  (state: Store) => state.todo.filter,
  (items, filter) => {
    switch (filter) {
      case 'All': {
        return items;
      }
      case 'Completed': {
        return items.filter(element => element.isChecked);
      }
      case 'NotCompleted': {
        return items.filter(element => !element.isChecked);
      }
      default: {
        return items;
      }
    }
  }
);
