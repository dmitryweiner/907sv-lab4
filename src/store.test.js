import { reducer, ACTION_TYPES } from './store';
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
    type: ACTION_TYPES.EDIT,
    payload: '123'
  });
  state = reducer(state, {
    type: ACTION_TYPES.CHECK,
    payload: { id: state.list[0].id, value: 'newtext' }
  });
  expect(state.list.length).toEqual(1);
  expect(state.list[0].title).toEqual('newtext');
});
