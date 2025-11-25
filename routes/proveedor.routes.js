// routes/proveedor.routes.js
const express = require('express');
const router = express.Router();
const ProveedorController = require('../controllers/proveedor.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require("../middleware/permisos");

/**
 * @openapi
 * tags:
 *   - name: Proveedores
 *     description: Operaciones con proveedores
 */

/**
 * @openapi
 * /api/proveedor/guardarRegistro:
 *   post:
 *     tags: [Proveedores]
 *     summary: Crea un proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       201: { description: Creado }
 */
router.post('/guardarRegistro', auth, requirePermission("PROVEEDOR_CREATE"), ProveedorController.guardar);

/**
 * @openapi
 * /api/proveedor/listar:
 *   get:
 *     tags: [Proveedores]
 *     summary: Lista proveedores
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Proveedor' }
 */
router.get('/listar', auth, requirePermission("PROVEEDOR_LIST"), ProveedorController.listarTodos);

/**
 * @openapi
 * /api/proveedor/buscarid/{id}:
 *   get:
 *     tags: [Proveedores]
 *     summary: Obtiene proveedor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Proveedor' }
 *       404: { description: No encontrado }
 */
router.get('/buscarid/:id', auth,requirePermission("PROVEEDOR_LIST"), ProveedorController.BuscarId);

/**
 * @openapi
 * /api/proveedor/eliminar/{id}:
 *   delete:
 *     tags: [Proveedores]
 *     summary: Elimina proveedor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.delete('/eliminar/:id', auth, requirePermission("PROVEEDOR_DELETE"), ProveedorController.eliminar);

/**
 * @openapi
 * /api/proveedor/actualizar/{id}:
 *   patch:
 *     tags: [Proveedores]
 *     summary: Actualiza proveedor por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Proveedor' }
 *     responses:
 *       200:
 *         description: Actualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Proveedor' }
 *       404: { description: No encontrado }
 */
router.patch('/actualizar/:id', auth, requirePermission("PROVEEDOR_UPDATE"), ProveedorController.actualizar);

module.exports = router;
