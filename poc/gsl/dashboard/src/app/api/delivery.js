import { getSessionToken, getUserId } from '../utils/session';

const url =
  process.env.REACT_APP_DELIVERY_SERVICE_URL || 'http://localhost:3002';

export async function getDeliveries() {
  try {
    const res = await fetch(`${url}/deliveries`, {
      headers: {
        Authorization: `Bearer ${getSessionToken()}`,
        'X-User-ID': getUserId(),
      },
    });

    const body = await res.json();

    if (res.status !== 200) {
      throw new Error(body.message);
    }

    return body;
  } catch (error) {
    throw new Error(`Falha ao recuperar as entregas: ${error.message}`);
  }
}

export async function getDelivery(id) {
  try {
    const res = await fetch(`${url}/delivery/${id}`, {
      headers: {
        Authorization: `Bearer ${getSessionToken()}`,
        'X-User-ID': getUserId(),
      },
    });

    const body = await res.json();

    if (res.status !== 200) {
      throw new Error(body.message);
    }

    return body;
  } catch (error) {
    throw new Error(`Falha ao recuperar a entrega: ${error.message}`);
  }
}

export async function updateDelivery(id, data) {
  try {
    const res = await fetch(`${url}/delivery`, {
      method: 'PUT',
      body: JSON.stringify({ id, data }),
      headers: {
        Authorization: `Bearer ${getSessionToken()}`,
        'X-User-ID': getUserId(),
        'Content-Type': 'application/json',
      },
    });

    const body = await res.json();

    if (res.status !== 200) {
      throw new Error(body.message);
    }

    return body;
  } catch (error) {
    error.message = `Falha ao atualizar entrega: ${error.message}`;
    throw error;
  }
}
