import { Item, Store } from './index';

export function getFilteredList(store: Store): Item[] {
  if (store.filter.isAllDeedsChecked === true) {
    return store.todos.list;
  }
  if (store.filter.isDoneDeedsChecked === true) {
    return store.todos.list.filter(item => item.isChecked === true);
  }
  if (store.filter.isNotDoneDeedsChecked === true) {
    return store.todos.list.filter(item => item.isChecked === false);
  }
  return store.todos.list;
}
