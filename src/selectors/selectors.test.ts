import { ACTION_TYPE, ADD, CHECKED, SEARCH, FILTER } from '../store/actions/todoAction';
import { initialState as todoInitialState, reducer } from '../store/reducers/todoReducer';
import { initialState as alertInitialState } from '../store/reducers/alertReducer';
import { ItemI } from '../store/interfaces/itemInterface';
import { getSelectFilteredList } from './getSelectFilteredList';
import { getSearchFilteredItems } from './getSearchFilteredItems';
import { getFilteredItemsCount } from './getFilteredItemsCount';
import { Store } from '../store/reducers';
import { selectOptions } from '../components/SelectFilter/selectOptions';

const title = 'item';

const newItem: ItemI = {
  index: 'index',
  value: title,
  isChecked: false
};

const newItem2: ItemI = {
  index: 'index1',
  value: 'item2',
  isChecked: false
};

test('get select filtered list', () => {
  let state: Store = {
    todo: todoInitialState,
    alert: alertInitialState
  };

  const action1: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  const action2: ACTION_TYPE = {
    type: ADD,
    payload: newItem2
  };

  state = { ...state, todo: reducer(state.todo, action1) };
  state = { ...state, todo: reducer(state.todo, action2) };

  const checkedAction: ACTION_TYPE = {
    type: CHECKED,
    payload: state.todo.items[0].index
  };

  state = { ...state, todo: reducer(state.todo, checkedAction) };

  expect(getSelectFilteredList(state).length).toEqual(2);

  let filterAction: ACTION_TYPE = {
    type: FILTER,
    payload: selectOptions.Completed
  };

  state = { ...state, todo: reducer(state.todo, filterAction) };
  expect(getSelectFilteredList(state).length).toEqual(1);

  filterAction.payload = selectOptions.All;
  state = { ...state, todo: reducer(state.todo, filterAction) };
  expect(getSelectFilteredList(state).length).toEqual(2);

  filterAction.payload = selectOptions.NotCompleted;
  state = { ...state, todo: reducer(state.todo, filterAction) };
  expect(getSelectFilteredList(state).length).toEqual(1);
});

test('filtered items count', () => {
  let state: Store = {
    todo: todoInitialState,
    alert: alertInitialState
  };
  const action: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  state.todo = reducer(state.todo, action);
  state.todo = reducer(state.todo, action);
  expect(getFilteredItemsCount(state)).toEqual(2);
  expect(getFilteredItemsCount(state)).not.toEqual(3);
});

test('get search filtered items', () => {
  let state: Store = {
    todo: todoInitialState,
    alert: alertInitialState
  };
  const action1: ACTION_TYPE = {
    type: ADD,
    payload: newItem
  };

  const action2: ACTION_TYPE = {
    type: ADD,
    payload: newItem2
  };

  state.todo = reducer(state.todo, action1);
  state.todo = reducer(state.todo, action2);
  expect(state.todo.items.length).toEqual(2);
  expect(getSearchFilteredItems(state).length).toEqual(2);

  const setFilterAction: ACTION_TYPE = {
    type: SEARCH,
    payload: 'item2'
  };

  state = { ...state, todo: reducer(state.todo, setFilterAction) };
  expect(getSearchFilteredItems(state).length).toEqual(1);
});
