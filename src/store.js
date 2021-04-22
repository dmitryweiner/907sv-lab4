export const ACTION_TYPES = {
  ADD: 'add',
  REMOVE: 'remove',
  CHECKED: 'checked',
  EDIT: 'edit'
};

export const initialList = {
  list: [],
  isDoneFilter: false
};

export default function reducer(action, prevList = []) {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      const newValue = {
        id: Math.random().toString(36).substr(2),
        title: action.payload,
        isChecked: false
      };
      return [...prevList, newValue];
    }
    case ACTION_TYPES.REMOVE: {
      return [...prevList.filter(item => item.id !== action.payload)];
    }
    case ACTION_TYPES.CHECKED: {
      return [
        ...prevList.map(function (item) {
          if (item.id === action.payload) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        })
      ];
    }
    case ACTION_TYPES.EDIT: {
      return [
        ...prevList.map(function (item) {
          if (item.id === action.payload.id) {
            return { ...item, title: action.payload.title };
          }
          return item;
        })
      ];
    }
    default:
      return [...prevList];
  }
}

export function selectFilteredList({ list, isDone }) {
  if (!isDone) return list;

  return list.filter(item => item.isChecked);
}
