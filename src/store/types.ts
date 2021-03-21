import { ItemI } from './interfaces/itemInterface';

export const ADD = 'Add';
export const REMOVE = 'Remove';
export const REMOVELIST = 'RemoveList';
export const EDIT = 'Edit';
export const CHECKED = 'Checked';
export const FILTER = 'Filter';
export const SEARCH = 'search';

interface AddItem {
  type: typeof ADD;
  payload: ItemI;
}

interface RemoveItem {
  type: typeof REMOVE;
  payload: string;
}

interface RemoveList {
  type: typeof REMOVELIST;
}

interface EditItem {
  type: typeof EDIT;
  payload: {
    index: string;
    newValue: string;
  };
}

interface CheckedItem {
  type: typeof CHECKED;
  payload: string;
}

interface Filter {
  type: typeof FILTER;
  payload: string;
}

interface Search {
  type: typeof SEARCH;
  payload: string;
}

export type ACTION_TYPE =
  | AddItem
  | RemoveItem
  | RemoveList
  | EditItem
  | CheckedItem
  | Filter
  | Search;
