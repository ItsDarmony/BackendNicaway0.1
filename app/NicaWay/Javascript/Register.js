document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // evita recargar la página

  const nombres = document.getElementById("nombres").value;
  const apellidos = document.getElementById("apellidos").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;
  const mensajeEl = document.getElementById("mensaje");

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombres, apellidos, correo, password })
    });

    const data = await res.json();

    if (res.ok) {
      mensajeEl.textContent = data.message;
      mensajeEl.style.color = "green";

      // Redirigir a verificar.html después de 2 segundos
      setTimeout(() => {
        window.location.href = "/verificar.html";
      }, 2000);
    } else {
      mensajeEl.textContent = data.error;
      mensajeEl.style.color = "red";
    }
  } catch (err) {
    console.error(" Error:", err);
    mensajeEl.textContent = "Error al conectar con el servidor";
    mensajeEl.style.color = "red";
  }
});
