import { AlertMessageI } from '../interfaces/alertMessageInterface';

export const ADD = 'ALERT/add';
export const REMOVE = 'ALERT/remove';

interface addMessage {
  type: typeof ADD;
  payload: AlertMessageI;
}

interface removeMessage {
  type: typeof REMOVE;
  payload: string;
}

export type ACTION_TYPE = addMessage | removeMessage;
