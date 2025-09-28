import express from "express"; 
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("port", 4000);

// Middleware para leer JSON
app.use(express.json());

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, "NicaWay")));

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",  // cambia a tu clave de MySQL
  database: "nicaway"
});

db.connect(err => {
  if (err) {
    console.error(" Error al conectar con MySQL:", err);
    return;
  }
  console.log(" Conectado a MySQL");
});

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verificar conexión al servidor de correo
transporter.verify((error, success) => {
  if (error) {
    console.error(" Error con Nodemailer:", error);
  } else {
    console.log(" Servidor de correo listo para enviar mensajes");
  }
});

// Rutas de páginas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "NicaWay", "HTML", "Login.html"));
});

app.get("/register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "NicaWay", "HTML", "register.html"));
});

app.get("/Login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "NicaWay", "HTML", "Login.html"));
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "NicaWay", "HTML", "index.html"));
});

app.get("/Hoteles.html", (req, res) => {
  res.sendFile(path.join(__dirname, "NicaWay", "HTML", "Hoteles.html"));
});

app.get("/verificar.html", (req, res) => {
  res.sendFile(path.join(__dirname, "NicaWay", "HTML", "verificar.html"));
});

// 🔹 API Registro
app.post("/api/register", async (req, res) => {
  try {
    const { nombres, apellidos, correo, password } = req.body;

    // Encriptar contraseña
    const hashedPass = await bcrypt.hash(password, 10);

    // Generar código de verificación
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    // Guardar en BD
    const sql = `INSERT INTO usuarios 
                (nombres, apellidos, correo, password, codigo_verificacion, verificado) 
                VALUES (?, ?, ?, ?, ?, 0)`;

    db.query(sql, [nombres, apellidos, correo, hashedPass, codigo], async (err, result) => {
      if (err) {
        console.error(" Error al registrar usuario:", err);
        return res.status(500).json({ error: "Error al registrar usuario" });
      }

      console.log(` Usuario creado: ${correo}, código: ${codigo}`);

      try {
        await transporter.sendMail({
          from: `"NicaWay" <${process.env.EMAIL_USER}>`,
          to: correo,
          subject: "Verificación de cuenta NicaWay",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #2c3e50; text-align: center;"> Bienvenido a NicaWay</h2>
              <p>Hola <b>${nombres}</b>,</p>
              <p>Gracias por registrarte en <b>NicaWay</b>. Para activar tu cuenta, utiliza el siguiente código de verificación:</p>
              
              <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; color: #e74c3c; background: #fbeaea; padding: 10px 20px; border-radius: 8px;">
                  ${codigo}
                </span>
              </div>

              <p>Ingresa este código en la página de verificación para completar tu registro.</p>

              <hr style="margin: 20px 0;">
              <p style="font-size: 12px; color: #7f8c8d; text-align: center;">
                Si no creaste esta cuenta, puedes ignorar este correo.
              </p>
            </div>
          `
        });
      } catch (mailErr) {
        console.error(" Error al enviar correo:", mailErr);
        return res.status(500).json({ error: "Usuario creado, pero fallo el envío del correo" });
      }

      res.status(201).json({ 
        message: `Usuario ${nombres} registrado. Revisa tu correo para verificar tu cuenta.` 
      });
    });

  } catch (error) {
    console.error(" Error en registro:", error);
    res.status(500).json({ error: "Error en servidor" });
  }
});

// 🔹 API Verificación
app.post("/api/verificar", (req, res) => {
  const { correo, codigo } = req.body;

  const sql = "SELECT * FROM usuarios WHERE correo = ? AND codigo_verificacion = ?";
  db.query(sql, [correo, codigo], (err, results) => {
    if (err) {
      console.error(" Error en verificación:", err);
      return res.status(500).json({ error: "Error en verificación" });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Código inválido" });
    }

    const updateSql = "UPDATE usuarios SET verificado = 1, codigo_verificacion = NULL WHERE correo = ?";
    db.query(updateSql, [correo], (err2) => {
      if (err2) {
        console.error(" Error al actualizar usuario:", err2);
        return res.status(500).json({ error: "Error al activar cuenta" });
      }
      res.json({ message: "Cuenta verificada con éxito " });
    });
  });
});

// 🔹 API Login
app.post("/api/login", async (req, res) => {
  const { correo, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE correo = ?";
  db.query(sql, [correo], async (err, results) => {
    if (err) {
      console.error("Error en login:", err);
      return res.status(500).json({ error: "Error al iniciar sesión" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = results[0];

    // Validar verificación
    if (user.verificado === 0) {
      return res.status(401).json({ error: "Debes verificar tu cuenta antes de iniciar sesión" });
    }

    // Comparar contraseña
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({ token: "abc123xyz", nombres: user.nombres });
  });
});

// 🔹 Iniciar servidor
app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en el puerto", app.get("port"));
});
