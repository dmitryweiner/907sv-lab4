import { Item, Store } from './index';
import { FILTER_STATE } from './reducers/filterSlice';

export function getFilteredList(store: Store): Item[] {
  if (store.filter.filterState === FILTER_STATE.ALL_DEEDS) {
    return store.todos.list;
  }
  if (store.filter.filterState === FILTER_STATE.DONE_DEEDS) {
    return store.todos.list.filter(item => item.isChecked === true);
  }
  if (store.filter.filterState === FILTER_STATE.NOT_DONE_DEEDS) {
    return store.todos.list.filter(item => item.isChecked === false);
  }
  return store.todos.list;
}
