// routes/rol.routes.js
const express = require('express');
const router = express.Router();
const RolController = require('../controllers/rol.controller');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roles');
const requirePermission = require('../middleware/permisos');


/**
 * @openapi
 * tags:
 *   - name: Rol
 *     description: Operaciones con proveedores
 */

/**
 * @openapi
 * /api/roles/guardar:
 *   post:
 *     tags: [Rol]
 *     summary: Crea un proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       201: { description: Creado }
 */
router.post('/guardar', RolController.guardar);

/**
 * @openapi
 * /api/roles/listar:
 *   get:
 *     tags: [Rol]
 *     summary: Lista proveedores
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Rol' }
 */
router.get('/listar', RolController.listar);

/**
 * @openapi
 * /api/roles/buscarid/{id}:
 *   get:
 *     tags: [Rol]
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
 *             schema: { $ref: '#/components/schemas/Rol' }
 *       404: { description: No encontrado }
 */
router.get('/buscarid/:id',  RolController.BuscarId);

/**
 * @openapi
 * /api/roles/eliminar/{id}:
 *   delete:
 *     tags: [Rol]
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
router.delete('/eliminar/:id',  RolController.eliminar);

/**
 * @openapi
 * /api/roles/actualizar/{id}:
 *   patch:
 *     tags: [Rol]
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
 *           schema: { $ref: '#/components/schemas/Rol' }
 *     responses:
 *       200:
 *         description: Actualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Rol' }
 *       404: { description: No encontrado }
 */
router.patch('/actualizar/:id',  RolController.actualizar);

module.exports = router;
