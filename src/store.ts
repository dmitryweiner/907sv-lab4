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

export interface IActionAdd {
  type: typeof ACTION_TYPES.ADD;
  payload: string;
}

export interface IActionRemove {
  type: typeof ACTION_TYPES.REMOVE;
  payload: string;
}

export interface IActionCheck {
  type: typeof ACTION_TYPES.CHECK;
  payload: string;
}

export interface IActionFilter {
  type: typeof ACTION_TYPES.FILTER;
  payload: string;
}

export interface IActionSearch {
  type: typeof ACTION_TYPES.SEARCH;
  payload: string;
}

export interface Item {
  id: string;
  title: string;
  isChecked: boolean;
}

export type IAction = IActionAdd | IActionRemove | IActionCheck | IActionFilter | IActionSearch;

export type State = { list: Item[]; filter: string; searchBar: string };

export const initialState: State = {
  list: [],
  filter: SELECTOR_TYPES.ALL,
  searchBar: ''
};

export const reducer = function (action: IAction, state = initialState): State {
  switch (action.type) {
    case ACTION_TYPES.REMOVE: {
      return { ...state, list: [...state.list.filter(Item => Item.id !== action.payload)] };
    }
    case ACTION_TYPES.ADD: {
      const newTask = {
        id: Math.random().toString(36).substr(2),
        title: action.payload,
        isChecked: false
      };
      return { ...state, list: [...state.list, newTask] };
    }
    case ACTION_TYPES.CHECK: {
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload) {
          state.list[i].isChecked = !state.list[i].isChecked;
        }
      }
      return { ...state, list: [...state.list] };
    }
    case ACTION_TYPES.FILTER: {
      return { ...state };
    }
    case ACTION_TYPES.SEARCH: {
      return { ...state, searchBar: action.payload };
    }
    default:
      return { ...state };
  }
};

export function selectByChecked(filter: string, list: Item[]): Item[] {
  if (filter === SELECTOR_TYPES.DONE) {
    return list.filter(element => element.isChecked);
  }
  if (filter === SELECTOR_TYPES.NOT_DONE) {
    return list.filter(element => !element.isChecked);
  }
  return list;
}

function filtration(element: string, substr: string): boolean {
  return element.toUpperCase().indexOf(substr.toUpperCase()) !== -1;
}

export function selectBySearchBar(searchBar: string, list: Item[]): Item[] {
  if (searchBar !== '') {
    return list.filter(element => filtration(element.title, searchBar));
  }
  return list;
}

export function selectFilteredList(state: State): Item[] {
  let itemList = selectByChecked(state.filter, state.list);
  itemList = selectBySearchBar(state.searchBar, itemList);
  return itemList;
}
