const PROVEEDORDB = require('../models/proveedor.model');

//Guardar un nuevo registro
const guardar = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        // Validar que todos los campos obligatorios estén presentes
        if (!nombre || !descripcion ) {
            return res.status(400).json({
                status: "error",
                message: "Faltan campos obligatorios",
            });
        }

        const nuevoProveedor = new PROVEEDORDB({
            nombre,
            descripcion
        });

        const ProveedorGuardado = await nuevoProveedor.save();

        return res.status(201).json({
            status: "success",
            message: "Proveedor guardado exitosamente",
            data: ProveedorGuardado
        });
    } catch (error) {
        console.log("Error al guardar el proveedor: ", error);
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
        const proveedor = await PROVEEDORDB.find();
        return res.status(200).json({
            status: "success",
            message: "Lista de proveedores",
            data: proveedor
        });
    } catch (error) {
        console.log("Error al listar proveedores: ", error);
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
        const proveedor = await PROVEEDORDB.findById(id);

        if (!proveedor) {
            return res.status(404).json({
                status: "error",
                message: "Proveedor no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Proveedor encontrado",
            data: proveedor
        });
    } catch (error) {
        console.log("Error al buscar el proveedor: ", error);
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
        const eliminada = await PROVEEDORDB.findByIdAndDelete(id).lean();

        if (!eliminada) {
            return res.status(404).json({
                status: "error",
                message: "Proveedor no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Proveedor eliminado exitosamente",
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
         //1.-recibir los datos
         const id = req.params.id;   
         const {nombre, descripcion} = req.body;

         if(!nombre && !descripcion){
            return res.status(400).json(
               {  
                  status:"error",
                  message:"Debe de proporcionar a menos un campo para actualiazr",   
               }
            )
         }
         const datosactualizar =  {};
         if(nombre) datosactualizar.nombre = nombre;
         if(descripcion) datosactualizar.descripcion = descripcion;

          //buscar y actualizar el registro
         const ProductoActualizada =  await PROVEEDORDB.findByIdAndUpdate(id, datosactualizar, {new:true,//Devuelve el objeto actualizado
         runValidators:true //Ejecuta las validaciones del Schema
         });
         if(!ProductoActualizada){
            return res.status(404).json(
               {
                  status:"error",
                  message:"Ropa no encontrada en la bd",
               }
            )
         }

         //enviar una respuesta
         return res.status(200).json(
            {  
               status:"success",
               message:"Ropa actualizados en la bd",
               //se envia el proyecto antes de ser actualizado
               data: ProductoActualizada
            }
         )
      } catch (error) {
         console.error("Error al guardar un registro",error);
         return res.status(500).json(
            {
               message:"Error en el servidor",
               error: error.message
            }
         );
      }
   };

module.exports = {
    guardar,
    listarTodos,
    BuscarId,
    eliminar,
    actualizar
}