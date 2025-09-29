# NicaWay #

Proyecto web para la plataforma NicaWay, orientada al turismo en Nicaragua.
Incluye sistema de autenticación, visualización de hoteles con modales y tabs, y un calendario de actividades patronales y culturales.

# Características principales #
Autenticación:
Login y registro de usuarios.
Validación de credenciales (correo y contraseña).
Mensajes de error para credenciales incorrectas o usuarios no verificados.

# Hoteles #
Catálogo de hoteles destacados de Managua.
Modal con pestañas:
Descripción del hotel.
Servicios ofrecidos.
Contacto (teléfono, correo).
Imágenes adaptadas y uniformes.
Posición centrada en pantalla para mejorar la experiencia.

# Calendario Turístico #
Calendario dinámico con navegación entre meses.
Actividades patronales y culturales marcadas en fechas específicas.
Panel lateral con detalles de la actividad (título, descripción, lugar, hora, imagen).
Soporte para múltiples actividades por mes.

# Instalación y uso #
1. Clonar el repositorio : https://github.com/ItsDarmony/BackendNicaway0.1.git
2. abrir la consola de vs y ejecutar el comando npm run dev

# Estructura de Archivos #

```bash
NicaWay/
├── fonts/
│
├── DB(MYSQL)
│   ├── nicaway.sql
│
├── HTML/
│   ├── index.html           # Página principal
│   ├── Login.html           # Formulario de Inicio de Sesion
│   ├── registro.html        # Formulario de registro
│   ├── Hoteles.html         # Sección (en desarrollo) de hoteles
│   ├── Turismo.html         # Calendario + mapa de actividades (en desarrollo)
│   ├── Vehiculos.html       # Seccion de Renta de Vehiculos (en desarrollo)
│   ├── verificar.html       # Verificación de Registro
│
├── CSS/
│   ├── fonts.css
│   ├── Styles.css             # Estilos generales + sidebar
│   ├── Styleslogin.css        # Estilos del login
│   ├── Stylesregister.css     # Estilos del registro
│   ├── StylesHotel.css        # Estilos para la sección de hoteles
│   └── StylesTurismo.css      # Estilos para el calendario y mapa
│
├── Imagenes/                  # Logos, iconos, imágenes de fondo
│
├── Javascript
│   ├── hoteles.js             # Funcionalidad de la interfaz de hoteles
│   ├── Login.js               # Funcionalidad de la interfaz de Login
│   ├── Register.js            # Funcionalidad de la interfaz de Register
│   ├── turismo.js             # Funcionalidad de la interfaz de turismo
│   ├── verificar.js           # Funcionalidad para verificar codigo de autenticación
│
├── index.js                   # Funcionalidad de la interfaz de la pagina principal
│
├── .env                       # Funcionalidad para envio de codigo a direcciones de correos electronicos
├── package-lock.json          # Instalacion de dependecias
├── package.json               # Instalacion de Versiones 
│
│
└── README.md                  # Documentación del proyecto
