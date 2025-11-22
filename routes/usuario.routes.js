const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/roles');

// Rutas públicas
router.post('/registrar', UsuarioController.registrar);
router.post('/login', UsuarioController.login);

// Listar → admin, gerente
router.get('/listar', 
    auth, 
    requireRole("admin", "gerente"), 
    UsuarioController.listar
);

// Buscar por ID → admin, gerente
router.get('/buscarid/:id', 
    auth, 
    requireRole("admin", "gerente"), 
    UsuarioController.BuscarId
);

// Actualizar → admin, gerente, cajero (pero cajero solo a sí mismo)
router.put('/actualizar/:id', 
    auth, 
    requireRole("admin", "gerente", "cajero"), 
    UsuarioController.actualizar
);

// Eliminar → admin, gerente, cajero (cajero solo su cuenta)
router.delete('/eliminar/:id', 
    auth, 
    requireRole("admin", "gerente", "cajero"), 
    UsuarioController.eliminar
);

module.exports = router;
