import {
  ACTION_TYPES,
  SELECTOR_TYPES,
  initialState,
  reducer,
  selectFilteredList,
  selectBySearchBar,
  selectByChecked
} from './store';

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
    filtered: SELECTOR_TYPES.ALL,
    searchBar: ''
  };
});

test('При вызове редьюсера с экшеном add возвращается состояние стора, в котором добавлен новый элемент', () => {
  const field = 'field';
  const add = {
    type: ACTION_TYPES.ADD,
    payload: field
  };
  const result = reducer(initialState, add);
  expect(result.list).toHaveLength(1);
  expect(result.list[0].title).toEqual(field);
});

test('При вызове редьюсера с экшеном delete возвращается состояние стора, в котором удалён указанный элемент', () => {
  const id = '1';
  const remove = {
    type: ACTION_TYPES.REMOVE,
    payload: id
  };
  const result = reducer(state, remove);
  expect(result.list.length).toEqual(2);
  for (let i = 0; i < result.list.length; i++) {
    expect(result.list[i].id).not.toBe(state.list[1].id);
    expect(result.list[i].title).not.toBe(state.list[1].title);
  }
});

test('При вызове редьюсера с экшеном check возвращается состояние стора, в котором состояние указанного элемента изменено', () => {
  const id = '0';
  const check = {
    type: ACTION_TYPES.CHECK,
    payload: id
  };
  const result = reducer(state, check);
  expect(result.list[0].isChecked).toEqual(true);
});

test('При вызове редьюсера с экшеном filter возвращается состояние стора, в котором состояние filtered изменено', () => {
  const filter = {
    type: ACTION_TYPES.FILTER,
    payload: SELECTOR_TYPES.DONE
  };
  const result = reducer(state, filter);
  expect(result.filtered).toEqual(SELECTOR_TYPES.DONE);
});

test('При вызове редьюсера с экшеном search возвращается состояние стора с переданной в SearchBar строкой', () => {
  const stringForSearch = 'По';
  const search = {
    type: ACTION_TYPES.SEARCH,
    payload: stringForSearch
  };
  const result = reducer(state, search);
  expect(result.searchBar).toEqual(stringForSearch);
});

test('Функция фильтрации по строке поиска возвращает исходное состояние массива элементов, если поисковая строка пустая', () => {
  const result = selectBySearchBar(state.searchBar, state.list);
  expect(result).toHaveLength(3);
  for (let i = 0; i < state.list.length; i++) {
    expect(result[i].id).toEqual(state.list[i].id);
    expect(result[i].title).toEqual(state.list[i].title);
    expect(result[i].isChecked).toEqual(state.list[i].isChecked);
  }
});

test('Функция фильтрации по строке поиска возвращает массив элементов, которые в поле title содержат подстроку из searchbar', () => {
  state.searchBar = 'По';
  const result = selectBySearchBar(state.searchBar, state.list);
  expect(result).toHaveLength(2);
  expect(result[0].id).toEqual(state.list[1].id);
  expect(result[0].title).toEqual(state.list[1].title);
  expect(result[1].id).toEqual(state.list[2].id);
  expect(result[1].title).toEqual(state.list[2].title);
});

test('Функция фильтрации по отметке в чекбоксах возвращает исходный список элементов, если тип фильтрации ALL', () => {
  const result = selectByChecked(state.filtered, state.list);
  expect(result).toHaveLength(3);
  for (let i = 0; i < state.list.length; i++) {
    expect(result[i].id).toEqual(state.list[i].id);
    expect(result[i].title).toEqual(state.list[i].title);
    expect(result[i].isChecked).toEqual(state.list[i].isChecked);
  }
});

test('Функция фильтрации по отметке в чекбоксах возвращает список только отмеченных галочкой элементов, если тип фильтрации DONE', () => {
  state.filtered = SELECTOR_TYPES.DONE;
  const result = selectByChecked(state.filtered, state.list);
  expect(result).toHaveLength(1);
  expect(result[0].title).toEqual(state.list[2].title);
  expect(result[0].id).toEqual(state.list[2].id);
  expect(result[0].isChecked).toEqual(state.list[2].isChecked);
});

test('Функция фильтрации по отметке в чекбоксах возвращает список только неотмеченных галочкой элементов, если тип фильтрации NOT_DONE', () => {
  state.filtered = SELECTOR_TYPES.NOT_DONE;
  const result = selectByChecked(state.filtered, state.list);
  for (let i = 0; i < result.length; i++) {
    expect(result[i].id).toEqual(state.list[i].id);
    expect(result[i].title).toEqual(state.list[i].title);
    expect(result[i].isChecked).toEqual(state.list[i].isChecked);
  }
});

test('При вызове selectFilteredList с текущим стейтом возвращается неизмененный список элементов, т.к. filtered = ALL', () => {
  const result = selectFilteredList(state);
  expect(result).toHaveLength(3);
  for (let i = 0; i < state.list.length; i++) {
    expect(result[i].id).toEqual(state.list[i].id);
    expect(result[i].title).toEqual(state.list[i].title);
    expect(result[i].isChecked).toEqual(state.list[i].isChecked);
  }
});

test('При вызове selectFilteredList с текущим стейтом и filtered = DONE возвращается измененный список, в котором только чекнутые элементы', () => {
  state.filtered = SELECTOR_TYPES.DONE;
  const result = selectFilteredList(state);
  expect(result).toHaveLength(1);
  expect(result[0].title).toEqual(state.list[2].title);
  expect(result[0].id).toEqual(state.list[2].id);
});

test('При вызове selectFilteredList с текущим стейтом и filtered = NOT_DONE возвращается измененный список, в котором только нечекнутые элементы', () => {
  state.filtered = SELECTOR_TYPES.NOT_DONE;
  const result = selectFilteredList(state);
  expect(result).toHaveLength(2);
  expect(result[0].title).toEqual(state.list[0].title);
  expect(result[0].id).toEqual(state.list[0].id);
  expect(result[1].title).toEqual(state.list[1].title);
  expect(result[1].id).toEqual(state.list[1].id);
});

test('При вызове selectFilteredList c заданной строкой поиска возвращается список, в котором отображаются только содержащие её элементы', () => {
  state.searchBar = 'По';
  const result = selectFilteredList(state);
  expect(result).toHaveLength(2);
  expect(result[0].title).toEqual(state.list[1].title);
  expect(result[1].title).toEqual(state.list[2].title);
});

test('При вызове selectFilteredList и filtered = DONE c заданной строкой поиска возвращается список, в котором отображаются только содержащие её чекнутые элементы', () => {
  state.searchBar = 'По';
  state.filtered = SELECTOR_TYPES.DONE;
  const result = selectFilteredList(state);
  expect(result).toHaveLength(1);
  expect(result[0].title).toEqual(state.list[2].title);
});

test('При вызове selectFilteredList и filtered = NOT_DONE c заданной строкой поиска возвращается список, в котором отображаются только содержащие её нечекнутые элементы', () => {
  state.searchBar = 'По';
  state.filtered = SELECTOR_TYPES.NOT_DONE;
  const result = selectFilteredList(state);
  expect(result).toHaveLength(1);
  expect(result[0].title).toEqual(state.list[1].title);
});
