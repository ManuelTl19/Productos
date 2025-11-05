export function loadSidebar() {
  const container = document.getElementById('sidebar-root');
  if (!container) return;
  container.innerHTML = `
    <aside id="sidebar" class="sidebar">
      <div class="sidebar-header">
        <h2>Menú</h2>
      </div>
      <ul class="sidebar-list">
        <li class="active"><a href="#" data-route="/productos">Productos</a></li>
        <li><a href="#" data-route="/agregar">Agregar</a></li>
      </ul>
    </aside>
  `;

  container.querySelectorAll('[data-route]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const path = a.getAttribute('data-route');
      import('../router.js').then(m => m.router.navigate(path));
    });
  });
}
