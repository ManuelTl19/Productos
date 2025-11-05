import { API_BASE, ENDPOINTS } from '../utils/constants.js';

async function handleRes(res) {
  let body = null;
  try {
    body = await res.json();
  } catch (e) {
    // No JSON body
  }
  if (!res.ok) {
    const err = new Error((body && body.message) || `HTTP ${res.status}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  // API returns { status, message, data }
  return body && body.data !== undefined ? body.data : body;
}

export const ProductoService = {
  async getAll() {
    const res = await fetch(`${API_BASE}${ENDPOINTS.LIST}`);
    return handleRes(res);
  },
  async getById(id) {
    const res = await fetch(`${API_BASE}${ENDPOINTS.GET}/${id}`);
    return handleRes(res);
  },
  async create(data) {
    const res = await fetch(`${API_BASE}${ENDPOINTS.CREATE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleRes(res);
  },
  async update(id, data) {
    const res = await fetch(`${API_BASE}${ENDPOINTS.UPDATE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleRes(res);
  },
  async delete(id) {
    const res = await fetch(`${API_BASE}${ENDPOINTS.DELETE}/${id}`, { method: "DELETE" });
    return handleRes(res);
  },
};
