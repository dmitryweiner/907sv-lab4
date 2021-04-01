export function getFilteredList(list, isFilterDone = false) {
  if (isFilterDone === true) {
    return list.filter(item => item.isChecked === true);
  }
  return list;
}

export function moveUpHandler(list, id) {
  const indexOfMovingUpItem = list.findIndex(item => item.id === id);
  if (indexOfMovingUpItem === 0) {
    return list;
  } else {
    [list[indexOfMovingUpItem - 1], list[indexOfMovingUpItem]] = [
      list[indexOfMovingUpItem],
      list[indexOfMovingUpItem - 1]
    ];
    return [...list];
  }
}

export function moveDownHandler(list, id) {
  const indexOfMovingDownItem = list.findIndex(item => item.id === id);
  if (indexOfMovingDownItem === list.length - 1) {
    return list;
  } else {
    [list[indexOfMovingDownItem], list[indexOfMovingDownItem + 1]] = [
      list[indexOfMovingDownItem + 1],
      list[indexOfMovingDownItem]
    ];
    return [...list];
  }
}

export function addHandler(list, value) {
  const newElement = {
    id: Math.random().toString(36).substr(2),
    isChecked: false,
    title: value
  };
  return [...list, newElement];
}

export function deleteHandler(list, id) {
  return [...list.filter(item => item.id !== id)];
}

export function checkHandler(list, id) {
  return [
    ...list.map(function (item) {
      if (item.id === id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    })
  ];
}
