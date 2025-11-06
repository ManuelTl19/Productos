// Use explicit backend URL when frontend is served from a different origin.
// You can override by setting `window.__API_BASE__ = 'http://host:port/api/productos'` before loading the scripts.
const DEFAULT_BACKEND = 'http://localhost:3000';
const BASE = (typeof window !== 'undefined' && window.__API_BASE__) ? window.__API_BASE__ : `${DEFAULT_BACKEND}/api/productos`;

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`HTTP ${res.status} ${res.statusText} ${text}`);
    err.status = res.status;
    throw err;
  }
  // Try parse JSON, otherwise return raw text
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export async function listar() {
  const res = await fetchJson(`${BASE}/listar`);
  return (res && res.data) ? res.data : res;
}

export async function buscarPorId(id) {
  const res = await fetchJson(`${BASE}/buscarid/${encodeURIComponent(id)}`);
  return (res && res.data) ? res.data : res;
}

export async function crear(data) {
  return fetchJson(`${BASE}/guardarRegistro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function actualizar(id, data) {
  return fetchJson(`${BASE}/actualizar/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function eliminar(id) {
  return fetchJson(`${BASE}/eliminar/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}

export default { listar, buscarPorId, crear, actualizar, eliminar };
