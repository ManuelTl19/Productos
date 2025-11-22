const {Schema, model} = require('mongoose');

const UsuarioSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },

        usuario: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        rol: {
            type: String,
            required: true,
            enum: ["admin", "gerente", "cajero"],
            default: "cajero"
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Usuario", UsuarioSchema, "usuarios");
