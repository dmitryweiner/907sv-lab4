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
          title: title
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
      }).then(handleAlert)
  }
};

export default api;
