import reducer, {
  ACTION_TYPES,
  initialState,
  SELECT_FILTER_TYPES,
  selectByFilter,
  selectBySearchString,
  selectFilteredList
} from './store';

const title = 'Покормить цветы';
const substring = 'Кот';
const state = initialState;
const list = [
  {
    id: '1',
    title: 'Полить кота',
    isChecked: false
  },
  {
    id: '2',
    title: 'Покормить цветы',
    isChecked: true
  }
];

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

  test('Проверка изменения параметра элемента (ACTION_TYPES.CHECKED)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = reducer(initialState, addAction);
    state = reducer(state, addAction);

    const checkedAction = {
      type: ACTION_TYPES.CHECKED,
      payload: state.list[0].id
    };

    state = reducer(state, checkedAction);
    expect(state.list[0].isChecked).toBeTruthy();
  });

  test('Проверка изменения элемента (ACTION_TYPES.EDIT)', () => {
    const newTitle = 'Полить цветы';

    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = reducer(initialState, addAction);
    state = reducer(state, addAction);

    const editAction = {
      type: ACTION_TYPES.EDIT,
      payload: { id: state.list[0].id, title: newTitle }
    };

    state = reducer(state, editAction);
    expect(state.list[0].title).toEqual(newTitle);
  });

  test('Проверка изменения фильтра элемента (ACTION_TYPES.SELECT_FILTER)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = reducer(initialState, addAction);

    const selectFilterAction = {
      type: ACTION_TYPES.SELECT_BY_FILTER,
      payload: SELECT_FILTER_TYPES.DONE
    };

    state = reducer(state, selectFilterAction);
    expect(state.list.length).toEqual(1);
    expect(state.filter).toEqual(SELECT_FILTER_TYPES.DONE);
  });

  test('Проверка поиска элемента по подстроке (ACTION_TYPES.SELECT_BY_SEARCH_STRING)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let state = reducer(initialState, addAction);

    const selectBySearchStringAction = {
      type: ACTION_TYPES.SELECT_BY_SEARCH_STRING,
      payload: substring
    };

    state = reducer(state, selectBySearchStringAction);
    expect(state.list.length).toEqual(1);
    expect(state.list[0].isChecked).toEqual(list[0].isChecked);
    expect(state.substring).toEqual(substring);
  });

  test('Проверка фильтрации списка selectByFilter', () => {
    let filteredList = selectByFilter(list, SELECT_FILTER_TYPES.NOT_DONE);
    expect(filteredList.length).toEqual(1);
    expect(filteredList[0].id).toEqual(list[0].id);

    filteredList = selectByFilter(list, SELECT_FILTER_TYPES.ALL);
    expect(filteredList.length).toEqual(2);
  });

  test('Проверка фильтрации списка selectBySearchString', () => {
    let filteredList = selectBySearchString(list, substring);
    expect(filteredList.length).toEqual(1);
    expect(filteredList[0].title).toContain(list[0].title);

    filteredList = selectBySearchString(list, '');
    expect(filteredList.length).toEqual(list.length);
  });

  test('Проверка фильтрации списка selectFilteredList', () => {
    const state = {
      ...initialState,
      list,
      substring: 'цве',
      filter: SELECT_FILTER_TYPES.DONE
    };
    const filteredList = selectFilteredList(state);
    expect(filteredList.length).toEqual(1);
    expect(filteredList[0].title).toContain(list[1].title);
  });

  test('Проверка default case', () => {
    const defaultAction = {
      type: null
    };
    let state = reducer(initialState, defaultAction);
    expect(state.list.length).toEqual(0);
  });
});
