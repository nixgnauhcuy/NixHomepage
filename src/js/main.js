const config_fs = /* CONFIG_PLACEHOLDER */;
const canvas = document.getElementsByTagName('canvas')[0];

if (config_fs.config.canvas_gradient) {
  canvas.classList.add('canvas-gradient');
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }
}

document.getElementById("mode-btn").addEventListener("click", toggleTheme);
document.addEventListener("DOMContentLoaded", applySavedTheme);
