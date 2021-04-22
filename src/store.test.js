import reducer, { ACTION_TYPES, selectFilteredList } from './store';

const title = 'TestItem';

describe('Checking the operation store.js', () => {
  test('Checking the addition of an element (ACTION_TYPES. ADD)', () => {
    const action = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    const newList = reducer(action, []);

    expect(newList.length).toEqual(1);
    expect(newList[0]).toHaveProperty('id');
    expect(newList[0].title).toEqual(title);
  });

  test('Checking the deletion of an element (ACTION_TYPES. REMOVE)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let list = reducer(addAction, []);

    const removeAction = {
      type: ACTION_TYPES.REMOVE,
      payload: list[0].id
    };

    list = reducer(removeAction, list);
    expect(list.length).toEqual(0);
  });

  test('Checking the element change (ACTION_TYPES.CHECKED)', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let list = reducer(addAction, []);

    const checkedAction = {
      type: ACTION_TYPES.CHECKED,
      payload: list[0].id
    };

    list = reducer(checkedAction, list);
    expect(list[0].isChecked).toBeTruthy();
  });

  test('Checking the display of the selected element element (ACTION_TYPES. EDIT)', () => {
    const newTitle = 'TestItem';

    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: title
    };

    let list = reducer(addAction, []);

    const editAction = {
      type: ACTION_TYPES.EDIT,
      payload: { id: list[0].id, title: newTitle }
    };

    list = reducer(editAction, list);
    expect(list[0].title).toEqual(newTitle);
  });

  test('Checking list filtering', () => {
    const addAction = {
      type: ACTION_TYPES.ADD,
      payload: 'TestItem2'
    };
    let list = reducer(addAction, []);
    list = reducer(addAction, list);

    const checkedAction = {
      type: ACTION_TYPES.CHECKED,
      payload: list[1].id
    };
    list = reducer(checkedAction, list);

    const filteredList = selectFilteredList({ list: list, isDone: true });
    expect(filteredList.length).toEqual(1);
    expect(filteredList[0].id).toEqual(list[1].id);
  });
});
