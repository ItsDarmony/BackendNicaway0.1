document.getElementById("verify-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // evita recarga

  const correo = document.getElementById("correo").value;
  const codigo = document.getElementById("codigo").value;
  const mensajeEl = document.getElementById("mensaje");

  try {
    const res = await fetch("/api/verificar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, codigo })
    });

    const data = await res.json();

    if (res.ok) {
      mensajeEl.textContent = data.message;
      mensajeEl.style.color = "aqua";

      // Redirigir al login después de verificar
      setTimeout(() => {
        window.location.href = "/Login.html";
      }, 2000);
    } else {
      mensajeEl.textContent = data.error;
      mensajeEl.style.color = "red";
    }
  } catch (err) {
    console.error(" Error:", err);
    mensajeEl.textContent = "Error de conexión con servidor";
    mensajeEl.style.color = "red";
  }
});
