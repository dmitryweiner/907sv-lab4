import { Item, Store } from './index';

export function getFilteredList(store: Store): Item[] {
  if (store.filter.isFilterDone === true) {
    return store.todos.list.filter(item => item.isChecked === true);
  }
  return store.todos.list;
}
