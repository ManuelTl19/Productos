import { ProductoService } from '../../services/producto.service.js';

export async function loadEditarPage() {
  const app = document.getElementById('app');
  app.innerHTML = `<section class="editar"><h1>Editar producto</h1><div id="contenido">Cargando...</div><button id="volverEd">Volver a productos</button></section>`;

  document.getElementById('volverEd').addEventListener('click', () => {
    import('../../router.js').then(m => m.router.navigate('/productos'));
  });

  const id = window.__editId;
  const contenido = document.getElementById('contenido');
  if (!id) {
    contenido.innerHTML = '<p>No se especificó el id del producto a editar.</p>';
    return;
  }

  try {
    const producto = await ProductoService.getById(id);
    if (!producto) {
      contenido.innerHTML = '<p>Producto no encontrado.</p>';
      return;
    }

    // Mostrar un formulario simple con los campos actuales
    contenido.innerHTML = `
      <form id="formEditar">
        <label>Nombre<br><input name="nombre" value="${producto.nombre || ''}" /></label><br>
        <label>Descripcion<br><textarea name="descripcion">${producto.descripcion || ''}</textarea></label><br>
        <label>Precio<br><input name="precio" type="number" value="${producto.precio || 0}" /></label><br>
        <button type="submit">Guardar</button>
      </form>
      <div id="msg"></div>
    `;

    document.getElementById('formEditar').addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = e.target;
      const data = {
        nombre: f.nombre.value,
        descripcion: f.descripcion.value,
        // Nota: la ruta de actualización del backend solo permite nombre/descripcion según el controlador
      };
      try {
        const updated = await ProductoService.update(id, data);
        document.getElementById('msg').innerText = 'Guardado correctamente.';
      } catch (err) {
        document.getElementById('msg').innerText = 'Error al guardar: ' + (err.message || err);
      }
    });
  } catch (err) {
    contenido.innerHTML = '<p>Error al obtener el producto: ' + (err.message || err) + '</p>';
  }
}
