const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    // Información básica del producto
    nombre: {type: String,required: true,trim: true,},
    descripcion: {type: String, required: true, trim: true,},
    Imagen: {type: String,required: true,trim: true,},
    stock: {type: Number,required: true,min: [0, 'El stock no puede ser negativo'],default: 0},    
    precio: {type: Number,required: [true, 'El precio es obligatorio'],min: [0, 'El precio no puede ser negativo']},
    
    fechacaducidad: {type: Date,required: true,},
    fechadecompra: {type: Date,required: true,},
    provedoor: { type: Schema.Types.ObjectId, ref: 'proveedor', required: true },
    precioDeCompra: {type: Number,required: false,min: [0, 'El precio de compra no puede ser negativo']},

});

module.exports = model('Producto', productoSchema, 'productos');