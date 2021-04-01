import { createSelector } from 'reselect';
import { getSearchFilteredItems } from './getSearchFilteredItems';
import { Store } from '../store/reducers';
import { selectOptions } from '../components/SelectFilter/selectOptions';

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
