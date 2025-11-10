// openapi.js
const swaggerJSDoc = require('swagger-jsdoc');
const m2s = require('mongoose-to-swagger');

// importa tus modelos reales
const Producto = require('./models/productos.model');   // ojo al nombre del archivo
const Proveedor = require('./models/proveedor.model');

const ProductoSchemaOpenAPI  = m2s(Producto);
const ProveedorSchemaOpenAPI = m2s(Proveedor);

module.exports = swaggerJSDoc({
  definition: {
    openapi: '3.0.3',
    info: { title: 'Productos API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        Producto: ProductoSchemaOpenAPI,
        Proveedor: ProveedorSchemaOpenAPI,
      },
    },
  },
  apis: ['./routes/producto.routes.js', './routes/proveedor.routes.js'],
});
