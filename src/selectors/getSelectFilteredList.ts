import { createSelector } from 'reselect';
import { ListI } from '../store/interfaces/listInterface';
import { getSearchFilteredItems } from './getSearchFilteredItems';

export const getSelectFilteredList = createSelector(
  getSearchFilteredItems,
  (state: ListI) => state.filter,
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
