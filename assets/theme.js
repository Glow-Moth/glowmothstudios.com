// Light / dark theme: follows the device until the visitor picks one with the toggle (remembered).
(function () {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const paint = () => document.querySelectorAll(".theme-btn").forEach(b => {
    b.textContent = isDark() ? "☀️" : "🌙";
    b.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
  });
  document.addEventListener("DOMContentLoaded", () => {
    paint();
    document.querySelectorAll(".theme-btn").forEach(b => b.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
      paint();
    }));
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", paint);
})();
