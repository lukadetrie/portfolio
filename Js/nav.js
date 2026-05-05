/**
 * Menu burger (mobile / tablette)
 * - Ouvre/ferme le panneau
 * - Met à jour aria-expanded
 * - Ferme au clic extérieur et sur Escape
 */
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav.menu");
  const toggle = document.querySelector(".menu-toggle");
  const panel = document.getElementById("menu-panel");

  if (!nav || !toggle || !panel) return;

  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function setOpen(isOpen) {
    nav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  function isOpen() {
    return nav.classList.contains("is-open");
  }

  toggle.addEventListener("click", () => {
    setOpen(!isOpen());
    if (isOpen()) {
      const first = panel.querySelector(focusableSelector);
      first?.focus?.();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (!nav.contains(target)) setOpen(false);
  });

  panel.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) setOpen(false);
  });
});
