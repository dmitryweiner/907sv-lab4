import { createStore } from 'redux';
export const ACTION_TYPES = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  REMOVE: 'REMOVE',
  CHECK: 'CHECK',
  SEARCH: 'SEARCH',
  SELECTOR: 'SELECTOR'
};
export const SELECTORS = {
  SELECTDONE: 'Выполненные',
  SELECTALL: 'Все',
  SELECTNOTDONE: 'Не выполненные'
};
export const initialState = {
  list: [],
  searchBar: '',
  selector: Object.keys(SELECTORS)[0]
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      let item_id = 1 - 0.5 + Math.random() * (10000 - 1 + 1);
      const item = {
        id: item_id,
        title: action.payload,
        isChecked: false
      };
      return {
        ...state,
        list: [...state.list, item]
      };
    }
    case ACTION_TYPES.CHECK: {
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload) {
          state.list[i].isChecked = !state.list[i].isChecked;
        }
      }
      return { ...state, list: [...state.list] };
    }
    case ACTION_TYPES.EDIT: {
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload.id) {
          state.list[i].title = action.payload.title;
        }
      }
      return { ...state, list: [...state.list] };
    }
    case ACTION_TYPES.REMOVE: {
      state.list = state.list.filter(function (elem) {
        if (elem.id === action.payload) {
          return false;
        } else {
          return true;
        }
      });
      return { ...state, list: [...state.list] };
    }
    case ACTION_TYPES.SEARCH: {
      return { ...state, searchBar: action.payload };
    }
    case ACTION_TYPES.SELECTOR: {
      return { ...state, selector: action.payload };
    }
    default:
      return state;
  }
}

export function selectBySearchBar(searchBar, list) {
  if (searchBar !== '') {
    return list.filter(e => e.title.toUpperCase().includes(searchBar.toUpperCase()));
  }
  return list;
}

export function selectBySelector(selector, list) {
  switch (selector) {
    case Object.keys(SELECTORS)[0]:
      return list.filter(e => e.isChecked);
    case SELECTORS.SELECTNOTDONE:
      return list.filter(e => !e.isChecked);
    case SELECTORS.SELECTALL:
      return list;
    default:
      return list;
  }
}

export function selectFilteredList(state) {
  let list = selectBySelector(state.selector, state.list);
  list = selectBySearchBar(state.searchBar, list);
  return list;
}

const store = createStore(reducer);
export default store;
