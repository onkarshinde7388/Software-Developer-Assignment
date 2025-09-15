
export const getApi = async (url, token) => {
  const response = await fetch(`http://localhost:3000${url}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}

export const postApi = async (username, password) => {
    console.log(username, password);
  const response = await fetch(`http://localhost:3000/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  });
  return response.json();
}
