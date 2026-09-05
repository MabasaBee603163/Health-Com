// Preload kept minimal for the pitch app shell.
// Expose nothing privileged yet — UI talks to Express over HTTP/WS only.
window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('healthcom-desktop-app')
})
