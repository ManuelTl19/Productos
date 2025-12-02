// utils/permisosDefault.js
const Permiso = require('../models/permisos.model');

const PERMISOS_DEFAULT = [
  // ---- PRODUCTO ----
  { nombre: 'PRODUCTO_LIST', recurso: 'PRODUCTO', accion: 'LIST', descripcion: 'Listar productos' },
  { nombre: 'PRODUCTO_CREATE', recurso: 'PRODUCTO', accion: 'CREATE', descripcion: 'Crear productos' },
  { nombre: 'PRODUCTO_UPDATE', recurso: 'PRODUCTO', accion: 'UPDATE', descripcion: 'Actualizar productos' },
  { nombre: 'PRODUCTO_DELETE', recurso: 'PRODUCTO', accion: 'DELETE', descripcion: 'Eliminar productos' },

  // ---- PROVEEDOR ----
  { nombre: 'PROVEEDOR_LIST',   recurso: 'PROVEEDOR', accion: 'LIST',   descripcion: 'Listar proveedores' },
  { nombre: 'PROVEEDOR_CREATE', recurso: 'PROVEEDOR', accion: 'CREATE', descripcion: 'Crear proveedores' },
  { nombre: 'PROVEEDOR_UPDATE', recurso: 'PROVEEDOR', accion: 'UPDATE', descripcion: 'Actualizar proveedores' },
  { nombre: 'PROVEEDOR_DELETE', recurso: 'PROVEEDOR', accion: 'DELETE', descripcion: 'Eliminar proveedores' },

  // ---- USER ----
  { nombre: 'USER_LIST',   recurso: 'USER', accion: 'LIST',   descripcion: 'Listar usuarios' },
  { nombre: 'USER_CREATE', recurso: 'USER', accion: 'CREATE', descripcion: 'Crear usuarios' },
  { nombre: 'USER_UPDATE', recurso: 'USER', accion: 'UPDATE', descripcion: 'Actualizar usuarios' },
  { nombre: 'USER_DELETE', recurso: 'USER', accion: 'DELETE', descripcion: 'Eliminar usuarios' },

  // ---- ROL ----
  { nombre: 'ROL_LIST',   recurso: 'ROL', accion: 'LIST',   descripcion: 'Listar roles' },
  { nombre: 'ROL_CREATE', recurso: 'ROL', accion: 'CREATE', descripcion: 'Crear roles' },
  { nombre: 'ROL_UPDATE', recurso: 'ROL', accion: 'UPDATE', descripcion: 'Actualizar roles' },
  { nombre: 'ROL_DELETE', recurso: 'ROL', accion: 'DELETE', descripcion: 'Eliminar roles' },

  // ---- PERMISOS ----
  { nombre: 'PERMISOS_LIST',   recurso: 'PERMISOS', accion: 'LIST',   descripcion: 'Listar permisos' },
  { nombre: 'PERMISOS_CREATE', recurso: 'PERMISOS', accion: 'CREATE', descripcion: 'Crear permisos' },
  { nombre: 'PERMISOS_UPDATE', recurso: 'PERMISOS', accion: 'UPDATE', descripcion: 'Actualizar permisos' },
  { nombre: 'PERMISOS_DELETE', recurso: 'PERMISOS', accion: 'DELETE', descripcion: 'Eliminar permisos' },

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
