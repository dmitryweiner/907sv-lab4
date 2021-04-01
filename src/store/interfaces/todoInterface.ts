import { ItemI } from './itemInterface';

export interface TodoI {
  items: ItemI[];
  filter: string;
  search: string;
}
