// index.js

const express = require('express');
const cors = require('cors');

const conection= require("./database/conection");
conection();

const productoRoutes = require('./routes/producto.routes');
const proveedorRoutes = require('./routes/proveedor.routes');
const usuarioRoutes = require('./routes/usuario.routes');

const { version }= require('mongoose');

const { apiReference } = require('@scalar/express-api-reference'); // <-- NUEVO
const openapi = require('./openapi'); // <-- NUEVO

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = 3000;

// CORS y body parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de tu API
app.use('/api/productos', productoRoutes);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/usuarios', usuarioRoutes);

// ---- Docs ----
// OpenAPI JSON generado desde JSDoc
app.get('/openapi.json', (_, res) => res.json(openapi));

// UI interactiva de Scalar con “Try it”
app.use('/api-explorer', apiReference({
  // Puedes apuntar a la misma ruta interna
  // o a una URL pública si lo hospedas fuera
  url: '/openapi.json',
  // Opcional: theme: 'purple' | 'alternate' | 'moon' | 'solarized'
  // theme: 'purple',
}));

// Server
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
  console.log(`Scalar UI: http://localhost:${PORT}/api-explorer`);
});
