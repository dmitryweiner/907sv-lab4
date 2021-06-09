import { Item, Store } from './index';
import { FILTER_STATE } from './reducers/filterSlice';

export function filterListByFilterState(list: Item[], filterState: FILTER_STATE): Item[] {
  if (filterState === FILTER_STATE.ALL_DEEDS) {
    return list;
  }
  if (filterState === FILTER_STATE.DONE_DEEDS) {
    return list.filter(item => item.isChecked === true);
  }
  if (filterState === FILTER_STATE.NOT_DONE_DEEDS) {
    return list.filter(item => item.isChecked === false);
  }
  return list;
}

export function filterListBySubstring(list: Item[], substringValue: string): Item[] {
  if (substringValue.length !== 0) {
    return list.filter(item =>
      item.title.toLowerCase().includes(substringValue.toLowerCase())
    );
  }
  return list;
}

export function getFilteredList(store:Store): Item[] {
  return filterListByFilterState(
    filterListBySubstring(store.todos.list, store.filter.substringValue),
    store.filter.filterState
  );
}
