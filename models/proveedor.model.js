const { Schema, model } = require('mongoose');

const proveedorSchema = new Schema({
    // Información básica del producto
    nombre: {type: String,required: true,trim: true,},
    descripcion: {type: String, required: true, trim: true,},
});

module.exports = model('Proveedor', proveedorSchema, 'proveedor');