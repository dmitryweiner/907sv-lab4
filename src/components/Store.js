export const ACTION_TYPES = {
  ADD: 'add',
  DELETE: 'delete',
  CHECK: 'check',
  MOVE_UP: 'move_up',
  MOVE_DOWN: 'move_down'
};

export const initialState = [];

export function reducer(action, prevState = initialState) {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      const newElement = {
        id: Math.random().toString(36).substr(2),
        isChecked: false,
        title: action.payload
      };
      return [...prevState, newElement];
    }

    case ACTION_TYPES.CHECK: {
      return [
        ...prevState.map(function (item) {
          if (item.id === action.payload) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        })
      ];
    }

    case ACTION_TYPES.DELETE: {
      return [...prevState.filter(item => item.id !== action.payload)];
    }

    case ACTION_TYPES.MOVE_UP: {
      const indexOfMovingUpItem = prevState.findIndex(item => item.id === action.payload);
      if (indexOfMovingUpItem === 0) {
        return prevState;
      } else {
        [prevState[indexOfMovingUpItem - 1], prevState[indexOfMovingUpItem]] = [
          prevState[indexOfMovingUpItem],
          prevState[indexOfMovingUpItem - 1]
        ];
        return [...prevState];
      }
    }

    case ACTION_TYPES.MOVE_DOWN: {
      const indexOfMovingDownItem = prevState.findIndex(item => item.id === action.payload);
      if (indexOfMovingDownItem === prevState.length - 1) {
        return prevState;
      } else {
        [prevState[indexOfMovingDownItem], prevState[indexOfMovingDownItem + 1]] = [
          prevState[indexOfMovingDownItem + 1],
          prevState[indexOfMovingDownItem]
        ];
        return [...prevState];
      }
    }
  }
}

export function getFilteredList(list, isFilterDone = false) {
  if (isFilterDone === true) {
    return list.filter(item => item.isChecked === true);
  }
  return list;
}
