export const URL = 'http://localhost:3001';

export const defaultHeaders = {
  'Content-Type': 'application/json'
};

export enum REQUEST_STATUS {
  IDLE,
  LOADING,
  ERROR
}

const getRandomNumber = () => Math.random();

async function handleErrors(response: Response) {
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

const api = {
  add: (title: string) =>
    fetch(`${URL}/todos`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        title: title
      })
    }).then(handleErrors),
  list: () =>
    fetch(`${URL}/todos?${getRandomNumber()}`, {
      headers: defaultHeaders
    }).then(handleErrors),
  remove: (id: string) =>
    fetch(`${URL}/todos/${id}`, {
      method: 'DELETE',
      headers: defaultHeaders
    }).then(handleErrors),
  checked: (id: string, isChecked: boolean) =>
    fetch(`${URL}/todos/${id}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify({
        isChecked: isChecked
      })
    }).then(handleErrors),
  auth: (username: string, password: string) =>
    fetch(`${URL}/auth`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(handleErrors),
  checkAuth: () =>
    fetch(`${URL}/auth`, {
      headers: defaultHeaders
    }).then(handleErrors),
  logout: () =>
    fetch(`${URL}/auth`, {
      method: 'DELETE',
      headers: defaultHeaders
    }).then(handleErrors)
};

export default api;
