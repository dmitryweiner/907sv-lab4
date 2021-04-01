import { AlertMessageI } from './alertMessageInterface';

export interface AlertI {
  messages: Array<AlertMessageI>;
  delay: number;
}
