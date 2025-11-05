// 1.- Importar express
const express = require('express');
//2.- Crear router
const router= express.Router(); // Con esta linea se pueden crear distintas rutas

//3.- Cargar el controlador
const ProductoController= require('../controllers/producto.controller');

//4.- Definir las rutas

//Crear un proyecto
router.post('/guardarRegistro', ProductoController.guardar);

//Listar todos los proyectos
router.get('/listar', ProductoController.listarTodos);

//Listar un proyecto por ID
router.get('/buscarid/:id', ProductoController.BuscarId);

//Eliminar un proyecto por ID
router.delete('/eliminar/:id', ProductoController.eliminar);

//Actualizar un proyecto por ID
router.patch('/actualizar/:id', ProductoController.actualizar);

//5.- Exportar rutas
module.exports= router;