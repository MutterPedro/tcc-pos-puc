const url = process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:3001';

export async function login(username, password) {
  try {
    const res = await fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const body = await res.json();

    if (res.status !== 200) {
      throw new Error(body.message);
    }

    return body;
  } catch (error) {
    throw new Error(`Falha ao fazer o login: ${error.message}`);
  }
}
