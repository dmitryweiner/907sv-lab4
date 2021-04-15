import { ACTION_TYPES, reducer, getFilteredList, initialState } from './Store';
const testTitle = "I'm a deed";
const listToAlter = [
  {
    id: 1,
    isChecked: true,
    title: "I'm a deed"
  },
  {
    id: 2,
    isChecked: false,
    title: "I'm a deed"
  }
];

describe(' Тесты Store > getFilteredList + action.type.isFilterDone ', () => {
  test(
    ' добавление нескольких элементов, изменение isChecked у одного, изменение isFilterDone самого списка, ' +
      'фильтрация списка так чтобы в новом списке был только элемент с isChecked === true ',
    () => {
      const addAction = {
        type: ACTION_TYPES.ADD,
        payload: testTitle
      };
      let state = reducer(initialState, addAction);
      state = reducer(state, addAction);
      state = reducer(state, addAction);
      const checkAction = {
        type: ACTION_TYPES.CHECK,
        payload: state.list[0].id
      };
      state = reducer(state, checkAction);
      const filterCheckAction = {
        type: ACTION_TYPES.IS_FILTER_DONE
      };
      state = reducer(state, filterCheckAction);
      const filteredList = getFilteredList(state);
      expect(filteredList).toHaveLength(1);
    }
  );
});

describe(' Тесты Store > action.type.moveUp и action.type.moveDown ', () => {
  const filledState = {
    ...initialState,
    list: listToAlter
  };

  test(' moveUp меняет порядок элементов, возвращает измененный список ', () => {
    const moveUpAction = {
      type: ACTION_TYPES.MOVE_UP,
      payload: filledState.list[1].id
    };
    let alteredList = reducer(filledState, moveUpAction);
    expect(alteredList.list[0].id).toEqual(listToAlter[1].id);
    expect(alteredList.list[1].id).toEqual(listToAlter[0].id);
  });
  test(' moveUp получает элемент с index = 0, возвращает неизмененный список ', () => {
    const moveUpAction = {
      type: ACTION_TYPES.MOVE_UP,
      payload: filledState.list[0].id
    };
    let alteredList = reducer(filledState, moveUpAction);
    expect(alteredList.list[0].id).toEqual(listToAlter[0].id);
    expect(alteredList.list[1].id).toEqual(listToAlter[1].id);
  });
  test(' moveDown меняет порядок элементов, возвращает измененный список ', () => {
    const moveDownAction = {
      type: ACTION_TYPES.MOVE_DOWN,
      payload: filledState.list[0].id
    };
    let alteredList = reducer(filledState, moveDownAction);
    expect(alteredList.list[0].id).toEqual(listToAlter[1].id);
    expect(alteredList.list[1].id).toEqual(listToAlter[0].id);
  });
  test(' moveDown получает элемент с index = list.length-1, возвращает неизмененный список ', () => {
    const moveDownAction = {
      type: ACTION_TYPES.MOVE_DOWN,
      payload: filledState.list[1].id
    };
    let alteredList = reducer(filledState, moveDownAction);
    expect(alteredList.list[0].id).toEqual(listToAlter[0].id);
    expect(alteredList.list[1].id).toEqual(listToAlter[1].id);
  });
});

describe(' Тесты Store > action.type.add ', () => {
  test(' добавление нового элемента ', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: testTitle
    };
    const newState = reducer(initialState, addAction);
    expect(newState.list.length).toEqual(1);
    expect(newState.list[0]).toHaveProperty('id');
    expect(newState.list[0].title).toEqual(testTitle);
    expect(newState.list[0]).toHaveProperty('isChecked');
    expect(newState.list[0].isChecked).toEqual(false);
  });
});

describe(' Тесты Store > action.type.delete ', () => {
  test(' сначала добавление элемента, потом его удаление ', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: testTitle
    };
    let state = reducer(initialState, addAction);
    const deleteAction = {
      type: ACTION_TYPES.DELETE,
      payload: state.list[0].id
    };
    state = reducer(state, deleteAction);
    expect(state.list.length).toEqual(0);
  });
});

describe(' Тесты Store > action.type.check ', () => {
  test(' добавление элемента, изменение isChecked, проверка что изменился ', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: testTitle
    };
    let state = reducer(initialState, addAction);
    expect(state.list[0].isChecked).toEqual(false);
    const checkAction = {
      type: ACTION_TYPES.CHECK,
      payload: state.list[0].id
    };
    state = reducer(state, checkAction);
    expect(state.list[0].isChecked).toEqual(true);
  });
});
