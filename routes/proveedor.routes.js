// routes/proveedor.routes.js
const express = require('express');
const router = express.Router();
const ProveedorController = require('../controllers/proveedor.controller');

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
router.post('/guardarRegistro', ProveedorController.guardar);

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
router.get('/listar', ProveedorController.listarTodos);

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
router.get('/buscarid/:id', ProveedorController.BuscarId);

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
router.delete('/eliminar/:id', ProveedorController.eliminar);

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
router.patch('/actualizar/:id', ProveedorController.actualizar);

module.exports = router;
