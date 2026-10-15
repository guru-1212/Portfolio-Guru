// Shared by the header toggle and the command palette.
export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    // Storage can be blocked (private mode); the toggle still works for this visit.
  }
}
