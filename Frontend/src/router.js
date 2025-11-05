import { loadProductosPage } from "./pages/productos/productos.js";
import { loadAgregarPage } from "./pages/agregar/agregar.js";
import { loadEditarPage } from "./pages/editar/editar.js";

export const router = {
  routes: {
    "/productos": loadProductosPage,
    "/agregar": loadAgregarPage,
    "/editar": loadEditarPage,
  },
  navigate(path) {
    const screen = this.routes[path];
    if (screen) screen();
    else document.getElementById("app").innerHTML = "<h2>404 - Página no encontrada</h2>";
  },
};
