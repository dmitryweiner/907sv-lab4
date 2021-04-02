import {
  ACTION_TYPES,
  SELECTOR_TYPES,
  initialState,
  reducer,
  add,
  remove,
  check,
  filter,
  search
} from './store';

let state;
const title = 'абв123';

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

test('Создатель экшна add создает новый экшн типа ADD и с payload равным тому, что ему было передано в параметре', () => {
  const expectedAction = {
    type: ACTION_TYPES.ADD,
    payload: title
  };
  expect(add(title)).toEqual(expectedAction);
});

test('Создатель экшна remove создает новый экшн типа REMOVE и с payload равным тому, что ему было передано в параметре', () => {
  const expectedAction = {
    type: ACTION_TYPES.REMOVE,
    payload: title
  };
  expect(remove(title)).toEqual(expectedAction);
});

test('Создатель экшна check создает новый экшн типа CHECK и с payload равным тому, что ему было передано в параметре', () => {
  const expectedAction = {
    type: ACTION_TYPES.CHECK,
    payload: title
  };
  expect(check(title)).toEqual(expectedAction);
});

test('Создатель экшна filter создает новый экшн типа FILTER и с payload равным тому, что ему было передано в параметре', () => {
  const selector = SELECTOR_TYPES.DONE;
  const expectedAction = {
    type: ACTION_TYPES.FILTER,
    payload: selector
  };
  expect(filter(SELECTOR_TYPES.DONE)).toEqual(expectedAction);
});

test('Создатель экшна search создает новый экшн типа SEARCH и с payload равным тому, что ему было передано в параметре', () => {
  const expectedAction = {
    type: ACTION_TYPES.SEARCH,
    payload: title
  };
  expect(search(title)).toEqual(expectedAction);
});
