const ProductoDb = require('../models/productos.model');

//Guardar un nuevo registro
const guardar = async (req, res) => {
    try {
        const { nombre, descripcion, precio, fechacaducidad, fechadecompra, Imagen, stock, provedoor, precioDeCompra } = req.body;

        // Validar que todos los campos obligatorios estén presentes
        if (!nombre || !descripcion || !precio || !fechacaducidad || !fechadecompra || !Imagen || !stock || !provedoor) {
            return res.status(400).json({
                status: "error",
                message: "Faltan campos obligatorios",
            });
        }

        const nuevoProducto = new ProductoDb({
            nombre,
            descripcion,
            precio,
            precioDeCompra,
            fechacaducidad,
            fechadecompra,
            Imagen,
            stock,
            provedoor
        });

        const ProductoGuardado = await nuevoProducto.save();

        return res.status(201).json({
            status: "success",
            message: "Producto guardado exitosamente",
            data: ProductoGuardado
        });
    } catch (error) {
        console.log("Error al guardar el producto: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        })
    }
}

//Listar todos los registros
const listarTodos = async (req, res) => {
    try {
        const productos = await ProductoDb.find().populate('provedoor').lean();
        return res.status(200).json({
            status: "success",
            message: "Lista de productos",
            data: productos
        });
    } catch (error) {
        console.log("Error al listar productos: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

//Buscar un registro por ID
const BuscarId = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = await ProductoDb.findById(id).populate('provedoor').lean();

        if (!producto) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Producto encontrado",
            data: producto
        });
    } catch (error) {
        console.log("Error al buscar el producto: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

//Eliminar un registro por ID
const eliminar = async (req, res) => {
    try {
        const id = req.params.id;
        const eliminada = await ProductoDb.findByIdAndDelete(id).lean();

        if (!eliminada) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Producto eliminado exitosamente",
            data: eliminada
        });
    } catch (error) {
        console.log("Error al eliminar el producto: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message
        });
    }
};

const actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            nombre,
            descripcion,
            precio,
            precioDeCompra,
            fechacaducidad,
            fechadecompra,
            Imagen,
            stock,
            provedoor
        } = req.body;

        // Validar que al menos un campo se haya enviado
        if (
            !nombre &&
            !descripcion &&
            !precio &&
            !precioDeCompra &&
            !fechacaducidad &&
            !fechadecompra &&
            !Imagen &&
            !stock &&
            !provedoor
        ) {
            return res.status(400).json({
                status: "error",
                message: "Debe proporcionar al menos un campo para actualizar",
            });
        }

        // Construir objeto dinámico con los campos que sí vienen
        const datosactualizar = {};
        if (nombre) datosactualizar.nombre = nombre;
        if (descripcion) datosactualizar.descripcion = descripcion;
        if (precio) datosactualizar.precio = precio;
        if (precioDeCompra) datosactualizar.precioDeCompra = precioDeCompra;
        if (fechacaducidad) datosactualizar.fechacaducidad = fechacaducidad;
        if (fechadecompra) datosactualizar.fechadecompra = fechadecompra;
        if (Imagen) datosactualizar.Imagen = Imagen;
        if (stock) datosactualizar.stock = stock;
        if (provedoor) datosactualizar.provedoor = provedoor;

        // Buscar y actualizar el registro
        const productoActualizado = await ProductoDb.findByIdAndUpdate(
            id,
            datosactualizar,
            {
                new: true,          // Devuelve el objeto actualizado
                runValidators: true // Ejecuta validaciones del schema
            }
        ).populate('provedoor'); // Si quieres incluir los datos del proveedor

        if (!productoActualizado) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado en la base de datos",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Producto actualizado correctamente",
            data: productoActualizado,
        });

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            error: error.message,
        });
    }
};


module.exports = {
    guardar,
    listarTodos,
    BuscarId,
    eliminar,
    actualizar
}