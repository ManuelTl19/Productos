// middleware/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secret_local";

const auth = (req, res, next) => {
  try {
    // 1. Leer el token desde headers
    let token = req.headers["x-token"] || req.headers["authorization"];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "No se proporcionó token de autenticación",
      });
    }

    // Si viene como "Bearer xyz"
    if (typeof token === "string" && token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }

    // 2. Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Guardar info para rutas protegidas
    req.user = {
      id: decoded.uid,
      roles: decoded.roles || [],
      permisos: decoded.permisos || [],
      raw: decoded,
    };

    next();

  } catch (error) {

    // 🔥 Si el token expiró
    if (error.name === "TokenExpiredError") {
      console.log("⚠️ Token expirado en:", error.expiredAt);

      return res.status(401).json({
        status: "error",
        message: "El token ha expirado. Inicia sesión nuevamente.",
      });
    }

    // 🔥 Otros errores (token inválido, mal formado, etc.)
    console.log("❌ Error en autenticación:", error.message);

    return res.status(401).json({
      status: "error",
      message: "Token inválido",
      error: error.message,
    });
  }
};

module.exports = auth;
