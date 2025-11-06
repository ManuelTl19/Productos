import { initSidebar } from './sidebar.js';
import { initModals } from './modals.js';
import { initProducts } from './products.js';

// Inicializador de la app: montar módulos (sidebar, modales, products)
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initModals();
  initProducts({ containerId: 'productos', addBtnId: 'btnAgregar' });
});
