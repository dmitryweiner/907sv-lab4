import { ACTION_TYPES } from './actions';
import { initialState } from './index';
import rootReducer from './reducers/reducersIndex';
import { getFilteredList } from './selectors';
import { FILTER_STATE } from './reducers/filterSlice';

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

describe(' Тесты Store > getFilteredList + action.type.changeFilterState ', () => {
  test(
    ' добавление нескольких элементов, изменение isChecked у одного, изменение filterState.doneDeeds списка, ' +
      'фильтрация списка так чтобы в новом списке был только элемент с isChecked === true ',
    () => {
      const addAction = {
        type: ACTION_TYPES.ADD,
        payload: testTitle
      };
      let state = rootReducer(initialState, addAction);
      state = rootReducer(state, addAction);
      state = rootReducer(state, addAction);
      const checkAction = {
        type: ACTION_TYPES.CHECK,
        payload: state.todos.list[0].id
      };
      state = rootReducer(state, checkAction);
      const filterCheckAction = {
        type: ACTION_TYPES.CHANGE_FILTER_STATE,
        payload: FILTER_STATE.DONE_DEEDS
      };
      state = rootReducer(state, filterCheckAction);
      const filteredList = getFilteredList(state);
      expect(filteredList).toHaveLength(1);
    }
  );

  test(
    ' добавление нескольких элементов, изменение isChecked у одного, изменение filterState.notDoneDeeds списка, ' +
      'фильтрация списка так чтобы в новом списке было два элемента с isChecked === false ',
    () => {
      const addAction = {
        type: ACTION_TYPES.ADD,
        payload: testTitle
      };
      let state = rootReducer(initialState, addAction);
      state = rootReducer(state, addAction);
      state = rootReducer(state, addAction);
      const checkAction = {
        type: ACTION_TYPES.CHECK,
        payload: state.todos.list[0].id
      };
      state = rootReducer(state, checkAction);
      const filterCheckAction = {
        type: ACTION_TYPES.CHANGE_FILTER_STATE,
        payload: FILTER_STATE.NOT_DONE_DEEDS
      };
      state = rootReducer(state, filterCheckAction);
      const filteredList = getFilteredList(state);
      expect(filteredList).toHaveLength(2);
    }
  );

  test(
    ' изначально выбран filterState.doneDeeds, добавление нескольких элементов, изменение isChecked у одного, ' +
      'изменение filterState.allDeeds списка, фильтрация списка так чтобы в новом списке были все элементы ',
    () => {
      const addAction = {
        type: ACTION_TYPES.ADD,
        payload: testTitle
      };
      let state = rootReducer(initialState, addAction);
      state = rootReducer(state, addAction);
      state = rootReducer(state, addAction);
      const firstFilterCheckAction = {
        type: ACTION_TYPES.CHANGE_FILTER_STATE,
        payload: FILTER_STATE.DONE_DEEDS
      };
      state = rootReducer(state, firstFilterCheckAction);
      const checkAction = {
        type: ACTION_TYPES.CHECK,
        payload: state.todos.list[0].id
      };
      state = rootReducer(state, checkAction);
      const filterCheckAction = {
        type: ACTION_TYPES.CHANGE_FILTER_STATE,
        payload: FILTER_STATE.ALL_DEEDS
      };
      state = rootReducer(state, filterCheckAction);
      const filteredList = getFilteredList(state);
      expect(filteredList).toHaveLength(3);
    }
  );
});

describe(' Тесты Store > action.type.moveUp и action.type.moveDown ', () => {
  const filledState = {
    ...initialState,
    todos: { list: listToAlter }
  };

  test(' moveUp меняет порядок элементов, возвращает измененный список ', () => {
    const moveUpAction = {
      type: ACTION_TYPES.MOVE_UP,
      payload: filledState.todos.list[1].id
    };
    let alteredList = rootReducer(filledState, moveUpAction);
    expect(alteredList.todos.list[0].id).toEqual(listToAlter[1].id);
    expect(alteredList.todos.list[1].id).toEqual(listToAlter[0].id);
  });
  test(' moveUp получает элемент с index = 0, возвращает неизмененный список ', () => {
    const moveUpAction = {
      type: ACTION_TYPES.MOVE_UP,
      payload: filledState.todos.list[0].id
    };
    let alteredList = rootReducer(filledState, moveUpAction);
    expect(alteredList.todos.list[0].id).toEqual(listToAlter[0].id);
    expect(alteredList.todos.list[1].id).toEqual(listToAlter[1].id);
  });
  test(' moveDown меняет порядок элементов, возвращает измененный список ', () => {
    const moveDownAction = {
      type: ACTION_TYPES.MOVE_DOWN,
      payload: filledState.todos.list[0].id
    };
    let alteredList = rootReducer(filledState, moveDownAction);
    expect(alteredList.todos.list[0].id).toEqual(listToAlter[1].id);
    expect(alteredList.todos.list[1].id).toEqual(listToAlter[0].id);
  });
  test(' moveDown получает элемент с index = list.length-1, возвращает неизмененный список ', () => {
    const moveDownAction = {
      type: ACTION_TYPES.MOVE_DOWN,
      payload: filledState.todos.list[1].id
    };
    let alteredList = rootReducer(filledState, moveDownAction);
    expect(alteredList.todos.list[0].id).toEqual(listToAlter[0].id);
    expect(alteredList.todos.list[1].id).toEqual(listToAlter[1].id);
  });
});

describe(' Тесты Store > action.type.add ', () => {
  test(' добавление нового элемента ', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: testTitle
    };
    const newState = rootReducer(initialState, addAction);
    expect(newState.todos.list.length).toEqual(1);
    expect(newState.todos.list[0]).toHaveProperty('id');
    expect(newState.todos.list[0].title).toEqual(testTitle);
    expect(newState.todos.list[0]).toHaveProperty('isChecked');
    expect(newState.todos.list[0].isChecked).toEqual(false);
  });
});

describe(' Тесты Store > action.type.delete ', () => {
  test(' сначала добавление элемента, потом его удаление ', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: testTitle
    };
    let state = rootReducer(initialState, addAction);
    const deleteAction = {
      type: ACTION_TYPES.DELETE,
      payload: state.todos.list[0].id
    };
    state = rootReducer(state, deleteAction);
    expect(state.todos.list.length).toEqual(0);
  });
});

describe(' Тесты Store > action.type.check ', () => {
  test(' добавление элемента, изменение isChecked, проверка что изменился ', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: testTitle
    };
    let state = rootReducer(initialState, addAction);
    expect(state.todos.list[0].isChecked).toEqual(false);
    const checkAction = {
      type: ACTION_TYPES.CHECK,
      payload: state.todos.list[0].id
    };
    state = rootReducer(state, checkAction);
    expect(state.todos.list[0].isChecked).toEqual(true);
  });
});
