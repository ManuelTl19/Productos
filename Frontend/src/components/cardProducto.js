import { ProductoService } from "../services/producto.service.js";
import { router } from "../router.js";

export function renderCardProducto(p) {
  return `
    <div class="card">
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <p><b>Precio:</b> $${p.precio}</p>
      <div class="actions">
        <button class="btn-edit" data-id="${p._id}">Editar</button>
        <button class="btn-delete" data-id="${p._id}">Eliminar</button>
      </div>
    </div>
  `;
}

