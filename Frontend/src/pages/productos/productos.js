import { ProductoService } from "../../services/producto.service.js";
import { renderCardProducto } from "../../components/cardProducto.js";
import { loadSidebar } from "../../components/sidebar.js";

export async function loadProductosPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="app-container">
      <div id="sidebar-root"></div>
      <main class="main-content">
        <div class="productos">
          <div class="header">
            <h1>Lista de Productos</h1>
            <button id="btnAgregar">Agregar</button>
          </div>
          <div id="lista" class="productos-grid"></div>
        </div>
      </main>
    </div>

    <!-- Modal backdrop -->
    <div id="modalBackdrop" class="modal-backdrop">
      <div class="modal" id="modal">
        <h3 id="modalTitle">Modal</h3>
        <div id="modalBody"></div>
        <div style="margin-top:12px; text-align:right;"><button id="modalClose">Cerrar</button></div>
      </div>
    </div>
  `;

  // cargar sidebar
  loadSidebar();

  const btnAgregar = document.getElementById("btnAgregar");
  const lista = document.getElementById("lista");
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  modalClose.addEventListener('click', () => modalBackdrop.classList.remove('open'));

  btnAgregar.addEventListener('click', () => openAddModal());

  async function refresh() {
    try {
      const productos = await ProductoService.getAll();
      if (!productos || productos.length === 0) {
        lista.innerHTML = '<p>No hay productos para mostrar.</p>';
        return;
      }
      lista.innerHTML = productos.map(renderCardProducto).join("");
    } catch (err) {
      lista.innerHTML = '<p>Error cargando productos: ' + (err.message || err) + '</p>';
    }
  }

  // Delegación de eventos para botones editar/eliminar
  lista.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;
    if (!id) return;
    if (btn.classList.contains('btn-delete')) {
      if (!confirm('¿Seguro que quieres eliminar este producto?')) return;
      try {
        await ProductoService.delete(id);
        await refresh();
      } catch (err) {
        alert('Error al eliminar: ' + (err.message || err));
      }
    }
    if (btn.classList.contains('btn-edit')) {
      openEditModal(id);
    }
  });

  function openAddModal() {
    modalTitle.innerText = 'Agregar producto';
    modalBody.innerHTML = `
      <form id="formAdd">
        <label>Nombre<br><input name="nombre" required /></label><br>
        <label>Descripcion<br><textarea name="descripcion" required></textarea></label><br>
        <label>Precio<br><input name="precio" type="number" required /></label><br>
        <label>Fecha caducidad<br><input name="fechacaducidad" type="date" required /></label><br>
        <label>Fecha de compra<br><input name="fechadecompra" type="date" required /></label><br>
        <label>Imagen URL<br><input name="Imagen" required /></label><br>
        <label>Stock<br><input name="stock" type="number" required /></label><br>
        <label>Proveedor ID<br><input name="provedoor" required /></label><br>
        <div style="margin-top:10px; text-align:right;"><button type="submit">Guardar</button></div>
      </form>
    `;
    modalBackdrop.classList.add('open');
    document.getElementById('formAdd').addEventListener('submit', async (e) => {
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
        modalBackdrop.classList.remove('open');
        await refresh();
      } catch (err) {
        alert('Error al crear: ' + (err.message || err));
      }
    });
  }

  async function openEditModal(id) {
    modalTitle.innerText = 'Editar producto';
    modalBody.innerHTML = '<div> Cargando... </div>';
    modalBackdrop.classList.add('open');
    try {
      const producto = await ProductoService.getById(id);
      modalBody.innerHTML = `
        <form id="formEdit">
          <label>Nombre<br><input name="nombre" value="${producto.nombre || ''}" required /></label><br>
          <label>Descripcion<br><textarea name="descripcion" required>${producto.descripcion || ''}</textarea></label><br>
          <label>Precio<br><input name="precio" type="number" value="${producto.precio || 0}" required /></label><br>
          <div style="margin-top:10px; text-align:right;"><button type="submit">Guardar</button></div>
        </form>
      `;
      document.getElementById('formEdit').addEventListener('submit', async (e) => {
        e.preventDefault();
        const f = e.target;
        const data = { nombre: f.nombre.value, descripcion: f.descripcion.value };
        try {
          await ProductoService.update(id, data);
          modalBackdrop.classList.remove('open');
          await refresh();
        } catch (err) {
          alert('Error al guardar: ' + (err.message || err));
        }
      });
    } catch (err) {
      modalBody.innerHTML = '<p>Error cargando producto: ' + (err.message || err) + '</p>';
    }
  }

  // Inicial
  await refresh();
}
