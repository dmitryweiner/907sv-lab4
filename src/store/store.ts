import { ListI } from './interfaces/listInterface';
import { ACTION_TYPE, ADD, CHECKED, EDIT, FILTER, REMOVE, REMOVELIST, SEARCH } from './types';
import { createSelector } from 'reselect';

export const initialState: ListI = {
  items: [],
  filter: 'All',
  search: ''
};

export function reducer(state: ListI = initialState, action: ACTION_TYPE): ListI {
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    case REMOVE: {
      return {
        ...state,
        items: [...state.items.filter(item => item.index !== action.payload)]
      };
    }
    case CHECKED: {
      return {
        ...state,
        items: [
          ...state.items.map(item => {
            if (item.index === action.payload) {
              return { ...item, isChecked: !item.isChecked };
            }
            return item;
          })
        ]
      };
    }
    case REMOVELIST: {
      return initialState;
    }
    case EDIT: {
      return {
        ...state,
        items: [
          ...state.items.map(item => {
            if (item.index === action.payload.index) {
              return { ...item, value: action.payload.newValue };
            } else {
              return item;
            }
          })
        ]
      };
    }
    case FILTER: {
      return { ...state, filter: action.payload };
    }
    case SEARCH: {
      return { ...state, search: action.payload };
    }
    default:
      return state;
  }
}

export const getSearchFilteredItems = createSelector(
  (state: ListI) => state.search,
  (state: ListI) => state.items,
  (search, items) =>
    items.filter(element => element.value.toUpperCase().indexOf(search.toUpperCase()) != -1)
);

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

export const getFilteredItemsCount = createSelector(getSelectFilteredList, items => items.length);
