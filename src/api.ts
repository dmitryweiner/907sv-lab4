const URL = 'http://localhost:3001';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

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
      fetch(`${URL}/todos`, {
        method: 'GET',
        headers: defaultHeaders
      }).then(handleAlert)
  }
};

export default api;
