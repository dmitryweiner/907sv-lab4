import { Item, Store } from './index';
import { FILTER_STATE } from './reducers/filterSlice';

export function filterListByFilterState(store: Store): Item[] {
  if (store.filter.filterState === FILTER_STATE.ALL_DEEDS) {
    return store.todos.list;
  }
  if (store.filter.filterState === FILTER_STATE.DONE_DEEDS) {
    return store.todos.list.filter(item => item.isChecked === true);
  }
  if (store.filter.filterState === FILTER_STATE.NOT_DONE_DEEDS) {
    return store.todos.list.filter(item => item.isChecked === false);
  }
  // if (store.filter.filterState === FILTER_STATE.SUBSTRING_SEARCH) {
  //   return store.todos.list.filter(item =>
  //     item.title.toLowerCase().includes(substringValue.toLowerCase())
  //   );
  // }
  return store.todos.list;
}

export function filterListBySubstring(store:Store, substringValue:string): Item[] {
  if (store.filter.substringValue.length !== 0) {
    return store.todos.list.filter(item => item.title.toLowerCase().includes(substringValue.toLowerCase()))
  }
  return store.todos.list;
}

// export function getFiteredList(store:Store): Item[] {
//   return filterListByFilterState(
//     filterListBySubstring(store, store.filter.substringValue),
//     store.filter.filterState
//   );
// }