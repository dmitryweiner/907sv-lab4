import { ACTION_TYPES, initialState, reducer, selectFilteredList } from './store';

let state;

beforeEach(() => {
  const array = [
    {
      id: '0',
      title: 'Вытереть пыль',
      isChecked: false
    },
    {
      id: '1',
      title: 'Полить цветы',
      isChecked: false
    },
    {
      id: '2',
      title: 'Помыть посуду',
      isChecked: true
    }
  ];

  state = {
    list: array,
    isFiltered: false,
    searchBar: ''
  };
});

test('При вызове редьюсера с экшеном add возвращается состояние стора, в котором добавлен новый элемент', () => {
  const field = 'field';
  const add = {
    type: ACTION_TYPES.ADD,
    payload: field
  };
  const result = reducer(add, initialState);
  expect(result.list).toHaveLength(1);
  expect(result.list[0].title).toEqual(field);
});

test('При вызове редьюсера с экшеном delete возвращается состояние стора, в котором удалён указанный элемент', () => {
  const id = '1';
  const remove = {
    type: ACTION_TYPES.REMOVE,
    payload: id
  };
  const result = reducer(remove, state);
  expect(result.list.length).toEqual(2);
  for (let i = 0; i < result.list.length; i++) {
    expect(result.list[i].id).not.toBe('1');
    expect(result.list[i].title).not.toBe('Полить цветы');
  }
});

test('При вызове редьюсера с экшеном check возвращается состояние стора, в котором состояние указанного элемента изменено', () => {
  const id = '0';
  const check = {
    type: ACTION_TYPES.CHECK,
    payload: id
  };
  const result = reducer(check, state);
  expect(result.list[0].isChecked).toEqual(true);
});

test('При вызове редьюсера с экшеном filter возвращается состояние стора, в котором состояние isFiltered изменено', () => {
  const filter = {
    type: ACTION_TYPES.FILTER
  };
  const result = reducer(filter, state);
  expect(result.isFiltered).toBe(true);
});

test('При вызове редьюсера с экшеном search возвращается состояние стора с переданной в SearchBar строкой', () => {
  const stringForSearch = 'По';
  const search = {
    type: ACTION_TYPES.SEARCH,
    payload: stringForSearch
  };
  const result = reducer(search, state);
  expect(result.searchBar).toEqual(stringForSearch);
});

test('При вызове selectFilteredList с текущим стейтом возвращается неизмененный список элементов, т.к. isFiltered = false', () => {
  const result = selectFilteredList(state);
  expect(result).toHaveLength(3);
  expect(result[0].title).toEqual('Вытереть пыль');
  expect(result[1].title).toEqual('Полить цветы');
  expect(result[2].title).toEqual('Помыть посуду');
});

test('При вызове selectFilteredList с текущим стейтом и isFiltered = true возвращается измененный список, в котором только чекнутые элементы', () => {
  state.isFiltered = true;
  const result = selectFilteredList(state);
  expect(result).toHaveLength(1);
  expect(result[0].title).toEqual('Помыть посуду');
  expect(result[0].id).toEqual('2');
});

test('При вызове selectFilteredList c заданной строкой поиска возвращается список, в котором отображаются только содержащие её элементы', () => {
  state.searchBar = 'По';
  const result = selectFilteredList(state);
  expect(result).toHaveLength(2);
  expect(result[0].title).toEqual('Полить цветы');
  expect(result[1].title).toEqual('Помыть посуду');
});

test('При вызове selectFilteredList и включенным фильтром c заданной строкой поиска возвращается список, в котором отображаются только содержащие её чекнутые элементы', () => {
  state.searchBar = 'По';
  state.isFiltered = true;
  const result = selectFilteredList(state);
  expect(result).toHaveLength(1);
  expect(result[0].title).toEqual('Помыть посуду');
});
