import { createStore } from 'redux';

export enum ACTION_TYPES {
  ADD = 'add',
  REMOVE = 'remove',
  CHECK = 'check',
  FILTER = 'filter',
  SEARCH = 'search'
}

export enum SELECTOR_TYPES {
  ALL = 'Все',
  DONE = 'Выполненные',
  NOT_DONE = 'Невыполненные'
}

export type SELECTOR_TYPE =
  | typeof SELECTOR_TYPES.ALL
  | SELECTOR_TYPES.DONE
  | SELECTOR_TYPES.NOT_DONE;

export interface ActionAdd {
  type: typeof ACTION_TYPES.ADD;
  payload: string;
}

export interface ActionRemove {
  type: typeof ACTION_TYPES.REMOVE;
  payload: string;
}

export interface ActionCheck {
  type: typeof ACTION_TYPES.CHECK;
  payload: string;
}

export interface ActionFilter {
  type: typeof ACTION_TYPES.FILTER;
  payload: SELECTOR_TYPE;
}

export interface ActionSearch {
  type: typeof ACTION_TYPES.SEARCH;
  payload: string;
}

export interface Item {
  id: string;
  title: string;
  isChecked: boolean;
}

export type Action = ActionAdd | ActionRemove | ActionCheck | ActionFilter | ActionSearch;

export type Store = { list: Item[]; filtered: SELECTOR_TYPE; searchBar: string };

export const initialState: Store = {
  list: [],
  filtered: SELECTOR_TYPES.ALL,
  searchBar: ''
};

export const reducer = function (store = initialState, action: Action): Store {
  switch (action.type) {
    case ACTION_TYPES.REMOVE: {
      return { ...store, list: [...store.list.filter(Item => Item.id !== action.payload)] };
    }
    case ACTION_TYPES.ADD: {
      const newTask = {
        id: Math.random().toString(36).substr(2),
        title: action.payload,
        isChecked: false
      };
      return { ...store, list: [...store.list, newTask] };
    }
    case ACTION_TYPES.CHECK: {
      for (let i = 0; i < store.list.length; i++) {
        if (store.list[i].id === action.payload) {
          store.list[i].isChecked = !store.list[i].isChecked;
        }
      }
      return { ...store, list: [...store.list] };
    }
    case ACTION_TYPES.FILTER: {
      return { ...store, filtered: action.payload };
    }
    case ACTION_TYPES.SEARCH: {
      return { ...store, searchBar: action.payload };
    }
    default:
      return store;
  }
};

export function selectByChecked(filtered: SELECTOR_TYPE, list: Item[]): Item[] {
  if (filtered === SELECTOR_TYPES.DONE) {
    return list.filter(element => element.isChecked);
  }
  if (filtered === SELECTOR_TYPES.NOT_DONE) {
    return list.filter(element => !element.isChecked);
  }
  return list;
}

export function selectBySearchBar(searchBar: string, list: Item[]): Item[] {
  if (searchBar !== '') {
    return list.filter(
      element => element.title.toUpperCase().indexOf(searchBar.toUpperCase()) !== -1
    );
  }
  return list;
}

export function selectFilteredList(store: Store): Item[] {
  let itemList = selectByChecked(store.filtered, store.list);
  itemList = selectBySearchBar(store.searchBar, itemList);
  return itemList;
}

export const store = createStore(reducer);
