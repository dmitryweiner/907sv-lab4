const URL = 'http://localhost:3001';
//const URL = 'http://192.168.200.105:3001';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

function randomNumber() {
  return Math.random();
}

async function handleAlert(response: any) {
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

const api = {
  todos: {
    add: ({ title }: { title: string }) =>
      fetch(`${URL}/todos`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          title
        })
      }).then(handleAlert),
    list: () =>
      fetch(`${URL}/todos?${randomNumber()}`, {
        method: 'GET',
        headers: defaultHeaders
      }).then(handleAlert),
    remove: ({ id }: { id: string }) =>
      fetch(`${URL}/todos/${id}`, {
        method: 'DELETE',
        headers: defaultHeaders
      }).then(handleAlert),
    checked: ({ id, isChecked }: { id: string; isChecked: boolean }) =>
      fetch(`${URL}/todos/${id}`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify({
          id,
          isChecked
        })
      }).then(handleAlert),
    edit: ({ id, title }: { id: string; title: string }) =>
      fetch(`${URL}/todos/${id}`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify({
          id,
          title
        })
      }).then(handleAlert)
  }
};

export default api;
