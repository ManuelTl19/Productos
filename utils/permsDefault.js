// utils/permisosDefault.js
const Permiso = require('../models/permisos.model');

const PERMISOS_DEFAULT = [
  // ---- PRODUCTO ----
  { nombre: 'PRODUCTO_LIST', recurso: 'PRODUCTO', accion: 'LIST', descripcion: 'Listar productos' },
  { nombre: 'PRODUCTO_READ', recurso: 'PRODUCTO', accion: 'READ', descripcion: 'Ver detalle de producto' },
  //{ nombre: 'PRODUCTO_CREATE', recurso: 'PRODUCTO', accion: 'CREATE', descripcion: 'Crear productos' },
  //{ nombre: 'PRODUCTO_UPDATE', recurso: 'PRODUCTO', accion: 'UPDATE', descripcion: 'Actualizar productos' },
  //{ nombre: 'PRODUCTO_DELETE', recurso: 'PRODUCTO', accion: 'DELETE', descripcion: 'Eliminar productos' },

];

async function ensureDefaultPermisos() {
  const creados = [];
  for (const p of PERMISOS_DEFAULT) {
    const doc = await Permiso.findOneAndUpdate(
      { nombre: p.nombre },
      p,
      { upsert: true, new: true }
    );
    creados.push(doc);
  }
  return creados;
}

module.exports = { ensureDefaultPermisos, PERMISOS_DEFAULT };
