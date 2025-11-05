import { ProductoService } from '../../services/producto.service.js';

export function loadAgregarPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <section class="agregar">
      <h1>Agregar producto</h1>
      <form id="formAgregar">
        <label>Nombre<br><input name="nombre" required /></label><br>
        <label>Descripcion<br><textarea name="descripcion" required></textarea></label><br>
        <label>Precio<br><input name="precio" type="number" required /></label><br>
        <label>Fecha caducidad<br><input name="fechacaducidad" type="date" required /></label><br>
        <label>Fecha de compra<br><input name="fechadecompra" type="date" required /></label><br>
        <label>Imagen URL<br><input name="Imagen" required /></label><br>
        <label>Stock<br><input name="stock" type="number" required /></label><br>
        <label>Proveedor ID<br><input name="provedoor" required /></label><br>
        <button type="submit">Guardar</button>
        <button type="button" id="volver">Volver</button>
      </form>
      <div id="msg"></div>
    </section>
  `;

  document.getElementById('volver').addEventListener('click', () => {
    import('../../router.js').then(m => m.router.navigate('/productos'));
  });

  document.getElementById('formAgregar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target;
    const data = {
      nombre: f.nombre.value,
      descripcion: f.descripcion.value,
      precio: Number(f.precio.value),
      fechacaducidad: f.fechacaducidad.value,
      fechadecompra: f.fechadecompra.value,
      Imagen: f.Imagen.value,
      stock: Number(f.stock.value),
      provedoor: f.provedoor.value,
    };
    try {
      await ProductoService.create(data);
      document.getElementById('msg').innerText = 'Producto creado correctamente.';
      // ir a la lista
      import('../../router.js').then(m => m.router.navigate('/productos'));
    } catch (err) {
      document.getElementById('msg').innerText = 'Error al crear: ' + (err.message || err);
    }
  });
}
