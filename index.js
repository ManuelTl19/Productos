const express = require('express');
const cors = require('cors');

const conection= require("./database/conection");

conection();

const productoRoutes = require('./routes/producto.routes');
const proveedorRoutes = require('./routes/proveedor.routes');

const {version}= require('mongoose');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const PORT = 3000;

//El tecer paso es configurar cors
app.use(cors());
//El cuarto convertir los datos del body a objeto
//esto es convertir todos los datos que llegan del body a objeto json
app.use(express.json());
//nos permite acceder a los datos que llegan del body mas facilmente
app.use(express.urlencoded(
    {
        extended: true
    }
));

//Configuracion de la ruta de la documentacion
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/productos', productoRoutes);
app.use('/api/proveedor', proveedorRoutes);


//El sexto paso es poner el servior a escuchar
app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});