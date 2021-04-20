import { createSelector } from 'reselect';
import { getSearchFilteredItems } from './getSearchFilteredItems';
import { Store } from '../reducers';
import { selectOptions } from '../reducers/todoReducer';

const getSelectFilter = (state: Store) => state.todo.filter;

export const getSelectFilteredList = createSelector(
  getSearchFilteredItems,
  getSelectFilter,
  (items, filter) => {
    switch (filter) {
      case selectOptions.All: {
        return items;
      }
      case selectOptions.Completed: {
        return items.filter(element => element.isChecked);
      }
      case selectOptions.NotCompleted: {
        return items.filter(element => !element.isChecked);
      }
      default: {
        return items;
      }
    }
  }
);
