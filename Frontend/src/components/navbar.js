import { router } from "../router.js";

export function loadNavbar() {
  const nav = document.getElementById("navbar");
  nav.innerHTML = `
    <nav class="navbar">
      <button id="btnToggleSidebar" class="icon-btn">☰</button>
      <a href="#" id="navProductos">Productos</a>
      <a href="#" id="navAgregar">Agregar</a>
    </nav>
  `;

  document.getElementById("navProductos").addEventListener("click", () => router.navigate("/productos"));
  document.getElementById("navAgregar").addEventListener("click", () => router.navigate("/agregar"));
  document.getElementById('btnToggleSidebar').addEventListener('click', () => {
    const side = document.getElementById('sidebar');
    if (side) side.classList.toggle('open');
  });
}
