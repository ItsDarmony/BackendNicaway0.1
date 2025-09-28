document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    correo: e.target.correo.value,
    password: e.target.password.value
  };

  const mensaje = document.getElementById("mensaje-login");

  try {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      mensaje.textContent = "✅ Bienvenido de nuevo!";
      mensaje.style.color = "green";

      // Guardar token de sesión
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      // Redirigir tras 1.5 segundos a la página principal
      setTimeout(() => {
        window.location.href = "/index.html"; 
      }, 1500);
    } else {
      mensaje.textContent = "❌ Credenciales incorrectas";
      mensaje.style.color = "red";
    }
  } catch (err) {
    console.error("Error de conexión:", err);
    mensaje.textContent = "⚠️ Error de conexión con el servidor";
    mensaje.style.color = "orange";
  }
});
