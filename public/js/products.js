import { openFormModal, closeFormModal, openConfirmModal, initModals } from './modals.js';
import { initSidebar } from './sidebar.js';
import * as ProductoService from './producto.service.js';

let _productos = [];

function formatDateForInput(value){
  if(!value) return '';
  // If value is Date object
  if(value instanceof Date) return value.toISOString().slice(0,10);
  // If it's a string like 2025-10-01T... or '2025-10-01'
  try{
    const d = new Date(value);
    if(!isNaN(d)) return d.toISOString().slice(0,10);
  }catch(e){ }
  return '';
}

function renderProductos(container) {
  container.innerHTML = _productos.map(p => {
    const id = p._id || p.id || '';
    const imagen = p.Imagen || p.imagen || 'https://via.placeholder.com/300x150';
    const precio = (p.precioDeCompra != null) ? p.precioDeCompra : (p.precio != null ? p.precio : 'N/A');
    const proveedor = p.provedoor || p.proveedor || '';
    const fechac = p.fechadecompra || p.fechaCompra || '';
    const fechad = p.fechacaducidad || p.fechaCaducidad || '';
    return `
    <div class="card" data-id="${id}">
      <img src="${imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <small>${p.descripcion}</small>
      <small>Proveedor: ${proveedor}</small>
      <small>Precio: $${precio}</small>
      <small>Fecha compra: ${fechac}</small>
      <small>Caducidad: ${fechad}</small>
      <p class="stock ${p.stock > 0 ? 'verde' : 'rojo'}">Stock: ${p.stock}</p>
      <div class="acciones">
        <button class="btn-primary btn-edit" data-id="${id}">Editar</button>
        <button class="btn-danger btn-delete" data-id="${id}">Eliminar</button>
      </div>
    </div>
  `;
  }).join('');
}

export function initProducts({ containerId = 'productos', addBtnId = 'btnAgregar' } = {}){
  const contenedor = document.getElementById(containerId);
  const addBtn = document.getElementById(addBtnId);
  if (!contenedor) return;

  // fetch inicial
  ProductoService.listar().then(list => {
    _productos = Array.isArray(list) ? list : [];
    renderProductos(contenedor);
  }).catch(err => {
    console.error('Error cargando productos:', err);
    // fallback: lista vacía
    _productos = [];
    renderProductos(contenedor);
  });

  // Delegación
  contenedor.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id; // Mongo IDs are strings
    if (btn.classList.contains('btn-edit')) onEdit(id, contenedor);
    if (btn.classList.contains('btn-delete')) onDelete(id, contenedor);
  });

  if (addBtn) addBtn.addEventListener('click', () => onAdd(contenedor));
}

function onAdd(contenedor){
  openFormModal('Agregar producto');
  // attach submit handler
  const form = document.getElementById('productoForm');
  if (!form) return;
  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const nuevo = {
      // Map fields to backend schema names
      nombre: fd.get('nombre'),
      descripcion: fd.get('descripcion'),
      stock: Number(fd.get('stock') || 0),
      // backend expects 'fechadecompra' and 'fechacaducidad'
      fechadecompra: fd.get('fechadecompra'),
      fechacaducidad: fd.get('fechacaducidad'),
      // backend expects 'Imagen' (capital I)
      Imagen: fd.get('Imagen') || 'https://via.placeholder.com/300x150',
      // backend expects 'precio' and may also accept 'precioDeCompra'
      precio: Number(fd.get('precio') || 0),
      precioDeCompra: Number(fd.get('precio') || 0),
      // backend expects 'provedoor' (ObjectId string)
      provedoor: fd.get('provedoor')
    };
    try {
      await ProductoService.crear(nuevo);
      // refrescar lista
      const list = await ProductoService.listar();
      _productos = Array.isArray(list) ? list : [];
      renderProductos(contenedor);
      closeFormModal();
      form.removeEventListener('submit', onSubmit);
      form.reset();
    } catch (err) {
      console.error('Error creando producto', err);
      alert('Error al crear producto: ' + (err.message || err));
    }
    
  };
  form.addEventListener('submit', onSubmit);
}

function onEdit(id, contenedor){
  const prod = _productos.find(p => (p._id && p._id.toString() === id.toString()) || (p.id && p.id.toString() === id.toString()));
  if (!prod) return;
  // prefill form
  const form = document.getElementById('productoForm');
  if (!form) return;
  openFormModal('Editar producto');
  form.nombre.value = prod.nombre;
  form.descripcion.value = prod.descripcion;
  form.stock.value = prod.stock;
  form.fechadecompra.value = formatDateForInput(prod.fechadecompra || prod.fechaCompra);
  form.fechacaducidad.value = formatDateForInput(prod.fechacaducidad || prod.fechaCaducidad);
  form.Imagen.value = prod.Imagen || prod.imagen || '';
  form.provedoor.value = prod.provedoor || prod.proveedor || '';
  form.precio.value = prod.precio != null ? prod.precio : (prod.precioDeCompra != null ? prod.precioDeCompra : '');

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const cambios = {
      nombre: fd.get('nombre'),
      descripcion: fd.get('descripcion'),
      stock: Number(fd.get('stock') || 0),
      fechadecompra: fd.get('fechadecompra'),
      fechacaducidad: fd.get('fechacaducidad'),
      Imagen: fd.get('Imagen'),
      provedoor: fd.get('provedoor'),
      precio: Number(fd.get('precio') || 0)
    };
    try {
      await ProductoService.actualizar(id, cambios);
      const list = await ProductoService.listar();
      _productos = Array.isArray(list) ? list : [];
      renderProductos(contenedor);
      closeFormModal();
      form.removeEventListener('submit', onSubmit);
      form.reset();
    } catch (err) {
      console.error('Error actualizando producto', err);
      alert('Error al actualizar producto: ' + (err.message || err));
    }
  };
  form.addEventListener('submit', onSubmit);
}

function onDelete(id, contenedor){
  openConfirmModal('¿Seguro que deseas eliminar este producto?', () => {
    ProductoService.eliminar(id).then(async () => {
      const list = await ProductoService.listar();
      _productos = Array.isArray(list) ? list : [];
      renderProductos(contenedor);
    }).catch(err => {
      console.error('Error eliminando producto', err);
      alert('Error al eliminar producto: ' + (err.message || err));
    });
  });
}
