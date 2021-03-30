import { ItemI } from '../interfaces/itemInterface';

export const ADD = 'TODO/Add';
export const REMOVE = 'TODO/Remove';
export const REMOVELIST = 'TODO/RemoveList';
export const EDIT = 'TODO/Edit';
export const CHECKED = 'TODO/Checked';
export const FILTER = 'TODO/Filter';
export const SEARCH = 'TODO/search';

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
