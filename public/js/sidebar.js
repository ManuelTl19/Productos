// Sidebar como módulo: exporta initSidebar para inicializar listeners
export function initSidebar({ menuBtnId = 'menuBtn', sidebarId = 'sidebar', mainSelector = 'main' } = {}) {
  const sidebar = document.getElementById(sidebarId);
  const menuBtn = document.getElementById(menuBtnId);
  const main = document.querySelector(mainSelector);
  if (!sidebar || !menuBtn || !main) return;

  // Alternar visibilidad del sidebar
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    main.classList.toggle('shift');
  });

  // Navegación entre módulos (solo marcar active por ahora)
  const menuItems = sidebar.querySelectorAll('li');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      // hook: podríamos disparar un evento personalizado para cambiar módulos
      const evt = new CustomEvent('app:navigate', { detail: { module: item.textContent.trim().toLowerCase() } });
      document.dispatchEvent(evt);
    });
  });
}
