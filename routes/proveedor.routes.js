// 1.- Importar express
const express = require('express');
//2.- Crear router
const router= express.Router(); // Con esta linea se pueden crear distintas rutas

//3.- Cargar el controlador
const ProoveedorController= require('../controllers/proveedor.controller');

//4.- Definir las rutas

//Crear un proyecto
router.post('/guardarRegistro', ProoveedorController.guardar);

//Listar todos los proyectos
router.get('/listar', ProoveedorController.listarTodos);

//Listar un proyecto por ID
router.get('/buscarid/:id', ProoveedorController.BuscarId);

//Eliminar un proyecto por ID
router.delete('/eliminar/:id', ProoveedorController.eliminar);

//Actualizar un proyecto por ID
router.patch('/actualizar/:id', ProoveedorController.actualizar);

//5.- Exportar rutas
module.exports= router;