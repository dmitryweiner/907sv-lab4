import reducer, { ACTION_TYPES, initialState, SELECT_FILTER_TYPES, selectByFilter } from './store';

const title = 'Покормить цветы';
const state = initialState;

describe('Проверка функционирования store.js', () => {
  test('Проверка добавления элемента (ACTION_TYPES.ADD)', () => {
    const action = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    const newState = reducer(state, action);

    expect(newState.list.length).toEqual(1);
    expect(newState.list[0]).toHaveProperty('id');
    expect(newState.list[0].title).toEqual(title);
  });

  test('Проверка удаления элемента (ACTION_TYPES.REMOVE)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,

      payload: title
    };

    let state = reducer(initialState, addAction);

    const removeAction = {
      type: ACTION_TYPES.REMOVE,
      payload: state.list[0].id
    };

    state = reducer(state, removeAction);
    expect(state.list.length).toEqual(0);
  });

  test('Проверка изменения элемента (ACTION_TYPES.CHECKED)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = reducer(initialState, addAction);

    const checkedAction = {
      type: ACTION_TYPES.CHECKED,
      payload: state.list[0].id
    };

    state = reducer(state, checkedAction);
    expect(state.list[0].isChecked).toBeTruthy();
  });

  test('Проверка отображения выбранного элемента элемента (ACTION_TYPES.EDIT)', () => {
    const newTitle = 'Полить цветы';

    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = reducer(initialState, addAction);

    const editAction = {
      type: ACTION_TYPES.EDIT,
      payload: { id: state.list[0].id, title: newTitle }
    };

    state = reducer(state, editAction);
    expect(state.list[0].title).toEqual(newTitle);
  });

  test('Проверка фильтрации списка', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: 'Покормить цветы'
    };
    let state = reducer(initialState, addAction);
    state = reducer(state, addAction);

    const checkedAction = {
      type: ACTION_TYPES.CHECKED,
      payload: state.list[1].id
    };
    state = reducer(state, checkedAction);

    const selectByFilterAction = {
      type: ACTION_TYPES.SELECT_BY_FILTER,
      payload: SELECT_FILTER_TYPES.DONE
    };
    state = reducer(state, selectByFilterAction);

    const filteredList = selectByFilter(state);
    expect(filteredList.list.length).toEqual(2);
    expect(filteredList.list[1].id).toEqual(state.list[1].id);
  });

  test('Проверка изменения фильтра элемента (ACTION_TYPES.SELECT_FILTER)', () => {
    const action = {
      type: ACTION_TYPES.SELECT_BY_FILTER,
      payload: SELECT_FILTER_TYPES.DONE
    };

    let state = reducer(initialState, action);
    expect(state.filter).toEqual(SELECT_FILTER_TYPES.DONE);
  });
});
