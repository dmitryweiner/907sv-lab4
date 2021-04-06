import { selectByChecked, selectBySearchBar, selectFilteredList } from './selector';
import { SELECTOR_TYPES } from './store';

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

test('Функция фильтрации по строке поиска возвращает исходное состояние массива элементов, если поисковая строка пустая', () => {
  const result = selectBySearchBar(state);
  expect(result.list).toHaveLength(3);
  for (let i = 0; i < state.list.length; i++) {
    expect(result.list[i].id).toEqual(state.list[i].id);
    expect(result.list[i].title).toEqual(state.list[i].title);
    expect(result.list[i].isChecked).toEqual(state.list[i].isChecked);
  }
});

test('Функция фильтрации по строке поиска возвращает массив элементов, которые в поле title содержат подстроку из searchbar', () => {
  state.searchBar = 'По';
  const result = selectBySearchBar(state);
  expect(result.list).toHaveLength(2);
  expect(result.list[0].id).toEqual(state.list[1].id);
  expect(result.list[0].title).toEqual(state.list[1].title);
  expect(result.list[1].id).toEqual(state.list[2].id);
  expect(result.list[1].title).toEqual(state.list[2].title);
});

test('Функция фильтрации по отметке в чекбоксах возвращает исходный список элементов, если тип фильтрации ALL', () => {
  const result = selectByChecked(state);
  expect(result.list).toHaveLength(3);
  for (let i = 0; i < state.list.length; i++) {
    expect(result.list[i].id).toEqual(state.list[i].id);
    expect(result.list[i].title).toEqual(state.list[i].title);
    expect(result.list[i].isChecked).toEqual(state.list[i].isChecked);
  }
});

test('Функция фильтрации по отметке в чекбоксах возвращает список только отмеченных галочкой элементов, если тип фильтрации DONE', () => {
  state.filtered = SELECTOR_TYPES.DONE;
  const result = selectByChecked(state);
  expect(result.list).toHaveLength(1);
  expect(result.list[0].title).toEqual(state.list[2].title);
  expect(result.list[0].id).toEqual(state.list[2].id);
  expect(result.list[0].isChecked).toEqual(state.list[2].isChecked);
});

test('Функция фильтрации по отметке в чекбоксах возвращает список только неотмеченных галочкой элементов, если тип фильтрации NOT_DONE', () => {
  state.filtered = SELECTOR_TYPES.NOT_DONE;
  const result = selectByChecked(state);
  for (let i = 0; i < result.list.length; i++) {
    expect(result.list[i].id).toEqual(state.list[i].id);
    expect(result.list[i].title).toEqual(state.list[i].title);
    expect(result.list[i].isChecked).toEqual(state.list[i].isChecked);
  }
});

test('При вызове selectFilteredList с текущим стейтом возвращается неизмененный список элементов, т.к. filtered = ALL', () => {
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(3);
  for (let i = 0; i < state.list.length; i++) {
    expect(result.list[i].id).toEqual(state.list[i].id);
    expect(result.list[i].title).toEqual(state.list[i].title);
    expect(result.list[i].isChecked).toEqual(state.list[i].isChecked);
  }
});

test('При вызове selectFilteredList с текущим стейтом и filtered = DONE возвращается измененный список, в котором только чекнутые элементы', () => {
  state.filtered = SELECTOR_TYPES.DONE;
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(1);
  expect(result.list[0].title).toEqual(state.list[2].title);
  expect(result.list[0].id).toEqual(state.list[2].id);
});

test('При вызове selectFilteredList с текущим стейтом и filtered = NOT_DONE возвращается измененный список, в котором только нечекнутые элементы', () => {
  state.filtered = SELECTOR_TYPES.NOT_DONE;
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(2);
  expect(result.list[0].title).toEqual(state.list[0].title);
  expect(result.list[0].id).toEqual(state.list[0].id);
  expect(result.list[1].title).toEqual(state.list[1].title);
  expect(result.list[1].id).toEqual(state.list[1].id);
});

test('При вызове selectFilteredList c заданной строкой поиска возвращается список, в котором отображаются только содержащие её элементы', () => {
  state.searchBar = 'По';
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(2);
  expect(result.list[0].title).toEqual(state.list[1].title);
  expect(result.list[1].title).toEqual(state.list[2].title);
});

test('При вызове selectFilteredList и filtered = DONE c заданной строкой поиска возвращается список, в котором отображаются только содержащие её чекнутые элементы', () => {
  state.searchBar = 'По';
  state.filtered = SELECTOR_TYPES.DONE;
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(1);
  expect(result.list[0].title).toEqual(state.list[2].title);
});

test('При вызове selectFilteredList и filtered = NOT_DONE c заданной строкой поиска возвращается список, в котором отображаются только содержащие её нечекнутые элементы', () => {
  state.searchBar = 'По';
  state.filtered = SELECTOR_TYPES.NOT_DONE;
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(1);
  expect(result.list[0].title).toEqual(state.list[1].title);
});
