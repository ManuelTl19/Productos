const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        // 1. Leer el token desde los headers
        let token = req.headers["x-token"] || req.headers["authorization"];

        // 2. Verificar que el token exista
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "No se proporcionó token de autenticación"
            });
        }

        // Si el token viene con el prefijo "Bearer ", eliminarlo
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        }

        // 3. verificar el token con la clave secreta
        const decoded = jwt.verify(token, "secret_local");

        //4.- guardar info del usuarion en la peticion
        req.user = decoded;

        // 5. continuar al siguiente middleware o ruta
        next();
    } catch (error) {
        console.log("Error en autenticación: ", error);
        return res.status(401).json({
            status: "error",
            message: "Token inválido o expirado",
            error: error.message
        });
    }
};

module.exports = auth;