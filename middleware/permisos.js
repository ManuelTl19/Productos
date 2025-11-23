// middleware/permisos.js
module.exports = (...requiredPerms) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "No autenticado",
      });
    }

    const userPerms = req.user.permisos || [];

    const tieneTodo = requiredPerms.every((perm) =>
      userPerms.includes(perm)
    );

    if (!tieneTodo) {
      return res.status(403).json({
        status: "error",
        message: "No tienes permisos para realizar esta acción",
      });
    }

    next();
  };
};
