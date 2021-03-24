import reducer, { ACTION_TYPES, initialState, SELECT_FILTER_TYPES, selectByFilter } from './store';

const title = 'Покормить цветы';
const state = initialState;

describe('Проверка функционирования store.js', () => {
  test('Проверка добавления элемента (ACTION_TYPES.ADD)', () => {
    const action = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    const newState = reducer(action, state);

    expect(newState.list.length).toEqual(1);
    expect(newState.list[0]).toHaveProperty('id');
    expect(newState.list[0].title).toEqual(title);
  });

  test('Проверка удаления элемента (ACTION_TYPES.REMOVE)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,

      payload: title
    };

    let state = reducer(addAction, initialState);

    const removeAction = {
      type: ACTION_TYPES.REMOVE,
      payload: state.list[0].id
    };

    state = reducer(removeAction, state);
    expect(state.list.length).toEqual(0);
  });

  test('Проверка изменения элемента (ACTION_TYPES.CHECKED)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = reducer(addAction, initialState);

    const checkedAction = {
      type: ACTION_TYPES.CHECKED,
      payload: state.list[0].id
    };

    state = reducer(checkedAction, state);
    expect(state.list[0].isChecked).toBeTruthy();
  });

  test('Проверка отображения выбранного элемента элемента (ACTION_TYPES.EDIT)', () => {
    const newTitle = 'Полить цветы';

    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = reducer(addAction, initialState);

    const editAction = {
      type: ACTION_TYPES.EDIT,
      payload: { id: state.list[0].id, title: newTitle }
    };

    state = reducer(editAction, state);
    expect(state.list[0].title).toEqual(newTitle);
  });

  test('Проверка фильтрации списка', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: 'Покормить цветы'
    };
    let state = reducer(addAction, initialState);
    state = reducer(addAction, state);

    const checkedAction = {
      type: ACTION_TYPES.CHECKED,
      payload: state.list[1].id
    };
    state = reducer(checkedAction, state);

    const filteredList = selectByFilter(state);
    expect(filteredList.length).toEqual(1);
    expect(filteredList[1].id).toEqual(state.list[1].id);
  });

  test('Проверка изменения фильтра элемента (ACTION_TYPES.SELECT_FILTER)', () => {
    const action = {
      type: ACTION_TYPES.SELECT_BY_FILTER,
      payload: SELECT_FILTER_TYPES.DONE
    };

    let state = reducer(action, initialState);
    expect(state.filter).toEqual(SELECT_FILTER_TYPES.DONE);
  });
});
