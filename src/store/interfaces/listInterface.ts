import { ItemI } from './itemInterface';

export interface ListI {
  items: ItemI[];
  filter: string;
  search: string;
}
