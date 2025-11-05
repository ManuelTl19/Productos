import { router } from "./router.js";
import { loadNavbar } from "./components/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();
  router.navigate("/productos");
});
