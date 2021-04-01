import {
  getFilteredList,
  moveUpHandler,
  moveDownHandler,
  addHandler,
  deleteHandler,
  checkHandler
} from './Store';
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

describe(' Тесты Store > getFilteredList ', () => {
  test(' getFilteredList проводит фильтрацию и возвращает список только с выбранными checkbox ', () => {
    const showedDeeds = getFilteredList(listToAlter, true);
    for (let item of showedDeeds) {
      expect(item.isChecked).toBeTruthy();
    }
  });

  test(' getFilteredList проводит фильтрацию и возвращает неизмененный список ', () => {
    let showedDeeds = getFilteredList(listToAlter, false);
    expect(showedDeeds).toEqual(listToAlter);
  });
});

describe(' Тесты Store > moveUp и moveDown ', () => {
  test(' moveUpHandler меняет порядок элементов, возвращает измененный список ', () => {
    const alteredList = moveUpHandler(listToAlter, 2);
    expect(alteredList[0]).toHaveProperty('id', 2);
    expect(alteredList[1]).toHaveProperty('id', 1);
  });

  test(' moveUpHandler получает элемент с index = 0, возвращает неизмененный список ', () => {
    const alteredList = moveUpHandler(listToAlter, 1);
    expect(alteredList[0]).toHaveProperty('id', 1);
    expect(alteredList[1]).toHaveProperty('id', 2);
  });

  test(' moveDownHandler меняет порядок элементов, возвращает измененный список ', () => {
    const alteredList = moveDownHandler(listToAlter, 1);
    expect(alteredList[0]).toHaveProperty('id', 2);
    expect(alteredList[1]).toHaveProperty('id', 1);
  });

  test(' moveDownHandler получает элемент с index = list.length-1, возвращает не измененный список ', () => {
    const alteredList = moveDownHandler(listToAlter, 2);
    expect(alteredList[0]).toHaveProperty('id', 1);
    expect(alteredList[1]).toHaveProperty('id', 2);
  });
});

describe(' Тесты Store > addHandler ', () => {
  test(' addHandler получает list и value, возвращает list с элементом с value, проверка что новый элемент содержат все нужные правильные поля ', () => {
    const testValue = 'title';
    const alteredList = addHandler(listToAlter, testValue);
    expect(alteredList.length).toEqual(3);
    expect(alteredList[2]).toHaveProperty('id');
    expect(alteredList[2]).toHaveProperty('isChecked');
    expect(alteredList[2].isChecked).toEqual(false);
    expect(alteredList[2]).toHaveProperty('title');
    expect(alteredList[2].title).toEqual(testValue);
  });
});

describe(' Тесты Store > deleteHandler ', () => {
  test(' deleteHandler получает list и id, возвращает list без элемента с id, проверка что не удален неправильный элемент ', () => {
    const alteredList = deleteHandler(listToAlter, 2);
    expect(alteredList).not.toEqual(listToAlter);
    expect(alteredList.length).toEqual(1);
    expect(alteredList[0]).toHaveProperty('id', 1);
  });
});

describe(' Тесты Store > checkHandler ', () => {
  test(' checkHandler получает list и id, возвращает list, в котором у элемента с id изменился isChecked, проверка что isChecked не изменился у ненужного элемента ', () => {
    const alteredList = checkHandler(listToAlter, 2);
    expect(alteredList).not.toEqual(listToAlter);
    expect(alteredList[1].isChecked).toEqual(true);
    expect(alteredList[0].isChecked).toEqual(true);
  });
});
