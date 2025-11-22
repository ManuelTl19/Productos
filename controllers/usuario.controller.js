const UsuarioDB = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar un nuevo usuario
const registrar = async (req, res) => {
    try {
        const { nombre, usuario, password, rol } = req.body;

        // Verificar compos obligatorios
        if (!nombre || !usuario || !password) {
            return res.status(400).json({
                status: "error",
                message: "Faltan campos obligatorios"
            });
        }

        // verificar si el usuario ya existe
        const existe = await UsuarioDB.findOne({ usuario }).lean();
        if (existe) {
            return res.status(400).json({
                status: "error",
                message: "El nombre de usuario ya está en uso"
            });
        }

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const passwordEncriptada = bcrypt.hashSync(password, salt);

        const nuevoUsuario = new UsuarioDB({
            nombre,
            usuario,
            password: passwordEncriptada,
            rol
        });

        const usuarioGuardado = await nuevoUsuario.save();

        return res.status(201).json({
            status: "success",
            message: "Usuario registrado exitosamente",
            data: usuarioGuardado
        });

    } catch (error) {
        console.log("Error al registrar usuario: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // 1) Buscar usuario por su nombre/username (puede ser email si lo usas así)
        const user = await UsuarioDB.findOne({ usuario });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        // 2) Comparar la contraseña enviada con la contraseña hasheada en la BD
        // bcrypt.compareSync devuelve true si coinciden
        const passwordValida = bcrypt.compareSync(password, user.password);
        if (!passwordValida) {
            return res.status(400).json({
                status: "error",
                message: "Contraseña incorrecta"
            });
        }

        // 3) Generar el token JWT
        //   - payload: datos que quieres guardar en el token (nombre mínimo: id y rol)
        //   - firma usando process.env.JWT_SECRET
        //   - expiresIn controla la expiración
        const payload = { uid: user._id, rol: user.rol };
        const token = jwt.sign(payload, "secret_local", {
            expiresIn: "1h"
        });

        // 4) Responder con token + datos del usuario (sin password)
        return res.status(200).json({
            status: "success",
            message: "Inicio de sesión exitoso",
            data: {
                user: {
                    id: user._id,
                    nombre: user.nombre,
                    usuario: user.usuario,
                    rol: user.rol
                },
                token
            }
        });

    } catch (error) {
        console.log("Error en login: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Listar todos los usuarios
const listar = async (req, res) => {
    try {
        const usuarios = await UsuarioDB.find().select("-password").lean();

        return res.status(200).json({
            status: "success",
            message: "Lista de usuarios",
            data: usuarios
        });
    } catch (error) {
        console.log("Error al listar usuarios: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
}

// Buscar usuario por ID
const BuscarId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuarioDB.findById(id).select("-password").lean();

        if (!usuario) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario encontrado",
            data: usuario
        });
    } catch (error) {
        console.log("Error al buscar usuario por ID: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
}

// Actualizar usuario
const actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, usuario, password, rol } = req.body;

        const datosActualizar = {};

        if (nombre) datosActualizar.nombre = nombre;
        if (usuario) datosActualizar.usuario = usuario;
        if (rol) datosActualizar.rol = rol;

        // Si va a actualizar contraseña, encriptar
        if (password) {
            const salt = await bcrypt.genSalt(10);
            datosActualizar.password = await bcrypt.hash(password, salt);
        }

        const actualizado = await UsuarioDB.findByIdAndUpdate(id, datosActualizar, {
            new: true,
            runValidators: true
        }).select("-password");

        if (!actualizado) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario actualizado correctamente",
            data: actualizado
        });

    } catch (error) {
        console.log("Error al actualizar usuario:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// eliminar un usuario por ID
const eliminar = async (req, res) => {
    try {
        const id = req.params.id;

        const eliminado = await UsuarioDB.findByIdAndDelete(id).lean();

        if (!eliminado) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario eliminado exitosamente",
            data: eliminado
        });
    } catch (error) {
        console.log("Error al eliminar usuario:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

// Exportar las funciones
module.exports = {
    registrar,
    login,
    listar,
    BuscarId,
    actualizar,
    eliminar
};