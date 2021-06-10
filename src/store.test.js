import { reducer, ACTION_TYPES, SELECTORS, initialState, selectFilteredList } from './store';
test('reducer add', () => {
  const state = reducer(undefined, {
    type: ACTION_TYPES.ADD,
    payload: '123'
  });
  expect(state.list.length).toEqual(1);
  expect(state.list[0]).toHaveProperty('id');
  expect(state.list[0].title).toEqual('123');
});

test('reducer check', () => {
  let state = reducer(undefined, {
    type: ACTION_TYPES.ADD,
    payload: '123'
  });
  expect(state.list[0].isChecked).toEqual(false);
  state = reducer(state, {
    type: ACTION_TYPES.CHECK,
    payload: state.list[0].id
  });
  expect(state.list.length).toEqual(1);
  expect(state.list[0].isChecked).toEqual(true);
});

test('reducer edit', () => {
  let state = reducer(undefined, {
    type: ACTION_TYPES.ADD,
    payload: '123'
  });
  state = reducer(state, {
    type: ACTION_TYPES.EDIT,
    payload: {
      id: state.list[0].id,
      title: 'newtext'
    }
  });
  expect(state.list.length).toEqual(1);
  expect(state.list[0].title).toEqual('newtext');
});

test('reducer REMOVE', () => {
  let state = reducer(undefined, {
    type: ACTION_TYPES.ADD,
    payload: '123'
  });
  expect(state.list.length).toEqual(1);
  state = reducer(state, {
    type: ACTION_TYPES.REMOVE,
    payload: state.list[0].id
  });
  expect(state.list.length).toEqual(0);
});

test('reducer ACTION_TYPES.SEARCH', () => {
  let state = reducer(undefined, {
    type: ACTION_TYPES.SEARCH,
    payload: '123'
  });
  expect(state.searchBar).toEqual('123');
});

test('reducer ACTION_TYPES.SELECTOR', () => {
  let state = reducer(undefined, {
    type: ACTION_TYPES.SELECTOR,
    payload: Object.keys(SELECTORS)[1]
  });
  expect(state.selector).toEqual(Object.keys(SELECTORS)[1]);
});

test('selectFilteredList check', () => {
  const state = { ...initialState };
  state.list = [
    {
      id: '123',
      title: 'TestItem1',
      isChecked: false
    },
    {
      id: '456',
      title: 'TestItem2',
      isChecked: true
    },
    {
      id: '789',
      title: 'TestItem3',
      isChecked: true
    }
  ];
  state.selector = Object.keys(SELECTORS)[0]; // DONE
  let filteredList = selectFilteredList(state);
  expect(filteredList.length).toBe(2);
  state.searchBar = 'TestItem3';
  filteredList = selectFilteredList(state);
  expect(filteredList[0].id).toBe(state.list[2].id);
});
