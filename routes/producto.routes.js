// routes/producto.routes.js
const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/producto.controller');
const auth = require('../middleware/auth');
const { requirePermission } = require("../middleware/permisos");

/**
 * @openapi
 * tags:
 *   - name: Productos
 *     description: Operaciones con productos
 */

/**
 * @openapi
 * /api/productos/guardarRegistro:
 *   post:
 *     tags: [Productos]
 *     summary: Crea un producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Producto' }
 *     responses:
 *       201:
 *         description: Creado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Producto' }
 */

// en producto.routes.js
router.post('/guardarRegistro', auth, requirePermission("PRODUCTO_CREATE"),  ProductoController.guardar);


/**
 * @openapi
 * /api/productos/listar:
 *   get:
 *     tags: [Productos]
 *     summary: Lista productos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Producto' }
 */
router.get('/listar', auth, requirePermission("PRODUCTO_LIST"), ProductoController.listarTodos);

/**
 * @openapi
 * /api/productos/buscarid/{id}:
 *   get:
 *     tags: [Productos]
 *     summary: Obtiene producto por ID
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
 *             schema: { $ref: '#/components/schemas/Producto' }
 *       404: { description: No encontrado }
 */
router.get('/buscarid/:id', auth, requirePermission("PRODUCTO_LIST"),  ProductoController.BuscarId);

/**
 * @openapi
 * /api/productos/eliminar/{id}:
 *   delete:
 *     tags: [Productos]
 *     summary: Elimina producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.delete('/eliminar/:id', auth, requirePermission("PRODUCTO_DELETE"),  ProductoController.eliminar);

/**
 * @openapi
 * /api/productos/actualizar/{id}:
 *   patch:
 *     tags: [Productos]
 *     summary: Actualiza producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Producto' }
 *     responses:
 *       200:
 *         description: Actualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Producto' }
 *       404: { description: No encontrado }
 */
router.patch('/actualizar/:id', auth, requirePermission("PRODUCTO_UPDATE"),  ProductoController.actualizar);

module.exports = router;
