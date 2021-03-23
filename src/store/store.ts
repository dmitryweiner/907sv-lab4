import { ListI } from './interfaces/listInterface';
import { ACTION_TYPE, ADD, CHECKED, EDIT, FILTER, REMOVE, REMOVELIST, SEARCH } from './types';

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

function searchFilter(state: ListI) {
  if (state.search === '') return state.items;
  return state.items.filter(
    element => element.value.toUpperCase().indexOf(state.search.toUpperCase()) != -1
  );
}

export function filterList(state: ListI) {
  switch (state.filter) {
    case 'All': {
      return searchFilter(state);
    }
    case 'Completed': {
      return searchFilter(state).filter(element => element.isChecked);
    }
    case 'NotCompleted': {
      return searchFilter(state).filter(element => !element.isChecked);
    }
    default: {
      return state.items;
    }
  }
}

export function countListItems(state: ListI): number {
  return filterList(state).length;
}

export function checkTitle(state: ListI, title: string): boolean {
  let check = true;

  state.items.map(item => {
    if (item.value === title) {
      check = false;
    }
  });

  return check;
}
