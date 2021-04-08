import { ItemI } from './itemInterface';
import { REQUEST_STATUS } from '../../Api/Api';

export interface TodoI {
  items: ItemI[];
  filter: string;
  search: string;
  requestStatus: REQUEST_STATUS;
}
