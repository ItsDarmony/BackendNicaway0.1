document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    correo: e.target.correo.value,
    password: e.target.password.value
  };

  const mensaje = document.getElementById("mensaje");

  try {
    const res = await fetch("/api/login", {   // 🔹 RUTA RELATIVA
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      mensaje.textContent = " Bienvenido de nuevo!";
      mensaje.style.color = "green";

      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("usuario", result.nombres); // opcional: guardar nombre
      }

      setTimeout(() => {
        window.location.href = "/index.html";
      }, 1500);
    } else {
      if (result.error && result.error.includes("verificar")) {
        mensaje.textContent = " Debes verificar tu cuenta antes de iniciar sesión";
      } else {
        mensaje.textContent = " Correo o contraseña incorrectos";
      }
      mensaje.style.color = "red";
    }
  } catch (err) {
    console.error("Error de conexión:", err);
    mensaje.textContent = " Error de conexión con el servidor";
    mensaje.style.color = "orange";
  }
});
