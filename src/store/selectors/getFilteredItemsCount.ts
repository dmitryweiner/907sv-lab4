import { createSelector } from 'reselect';
import { getSelectFilteredList } from './getSelectFilteredList';

export const getFilteredItemsCount = createSelector(getSelectFilteredList, items => items.length);
