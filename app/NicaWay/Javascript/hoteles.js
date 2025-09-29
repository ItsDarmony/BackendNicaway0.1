const hoteles = {
  holidayinn: {
    nombre: "Holiday Inn Managua – Convention Center",
    descripcion: "Ubicado en el centro de Managua, ideal para negocios y turismo.",
    servicios: [
      "Wi-Fi gratuito", "Estacionamiento gratis", "Piscina al aire libre",
      "Admite mascotas", "Gimnasio", "Restaurante Ánfora y bar Sunrise",
      "Servicio a la habitación 24h", "Shuttle con Wi-Fi al aeropuerto"
    ],
    contacto: {
      telefono: "+505 2255 6010",
      correo: "ventas@hi.com.ni"
    },
    imagen: "../Imagenes/Holiday Inn.avif"
  },

  hilton: {
    nombre: "Hilton Princess Managua",
    descripcion: "Hotel de lujo con piscina, gimnasio y restaurante.",
    servicios: [
      "Piscina al aire libre", "Gimnasio 24h", "Restaurante en el hotel",
      "WiFi gratuito", "Estacionamiento gratis", "Masajes", "Traslado al aeropuerto"
    ],
    contacto: {
      telefono: "+505 2255 5777",
      correo: "reservasmga@hiltonmanagua.com"
    },
    imagen: "../Imagenes/hilton.jpg"
  },

  caminoreal: {
    nombre: "Hotel Globales Camino Real Managua",
    descripcion: "Hotel elegante cerca del aeropuerto con spa y restaurante.",
    servicios: [
      "Piscina al aire libre", "Bar junto a la piscina", "Gimnasio", "Spa",
      "Restaurante", "Salas de reuniones", "Parking privado", "Seguridad 24h"
    ],
    contacto: {
      telefono: "+505 2255 5888",
      correo: "reservashcr@caminoreal.com.ni"
    },
    imagen: "../Imagenes/caminoreal.jpg"
  },

  hyatt: {
    nombre: "Hyatt Place Managua",
    descripcion: "Moderno y cómodo, ideal para viajes de negocios o familiares.",
    servicios: [
      "Desayuno incluido", "Restaurante", "Bar", "Piscina exterior",
      "Gimnasio", "WiFi gratuito", "Admite mascotas", "Servicio a la habitación"
    ],
    contacto: {
      telefono: "+505 2276 5200",
      correo: "managua.place@hyatt.com"
    },
    imagen: "../Imagenes/hyatt.jpg"
  },

  intercontinental: {
    nombre: "Real InterContinental Metrocentro Managua",
    descripcion: "Hotel 5 estrellas con restaurantes gourmet y spa.",
    servicios: [
      "Restaurantes gourmet", "Spa", "Piscinas", "Gimnasio",
      "WiFi de alta velocidad", "Salones de eventos", "Servicio de lujo"
    ],
    contacto: {
      telefono: "+505 2255 8989",
      correo: "reservas@r-intercontinental.com"
    },
    imagen: "../Imagenes/intercontinental.jpg"
  },

  mozonte: {
    nombre: "Hotel Mozonte",
    descripcion: "Ambiente familiar con dos piscinas y desayuno incluido.",
    servicios: [
      "WiFi gratuito", "Desayuno incluido", "Restaurante", "Dos piscinas",
      "Traslado al aeropuerto", "Estacionamiento privado", "Seguridad 24h"
    ],
    contacto: {
      telefono: "+505 2222 3412",
      correo: "reservas@hotelmozonte.com"
    },
    imagen: "../Imagenes/mozonte.jpg"
  },

  lasmercedes: {
    nombre: "Best Western Las Mercedes Airport Managua",
    descripcion: "Ubicado frente al aeropuerto, ideal para viajeros frecuentes.",
    servicios: [
      "Restaurante", "Desayuno buffet", "Piscina", "Gimnasio",
      "WiFi gratuito", "Traslado al aeropuerto", "Bar"
    ],
    contacto: {
      telefono: "+505 2255 9000",
      correo: "reservas@lasmercedes.com.ni"
    },
    imagen: "../Imagenes/lasmercedes.jpg"
  },

  crowne: {
    nombre: "Crowne Plaza Managua (IHG)",
    descripcion: "Hotel ejecutivo con servicios de negocios y piscina exterior.",
    servicios: [
      "Centro de negocios 24h", "Piscina exterior", "Conserjería",
      "Cambio de divisas", "Lavandería/valet", "Servicios ejecutivos"
    ],
    contacto: {
      telefono: "+505 2255 9870",
      correo: "managua@ihg.com"
    },
    imagen: "../Imagenes/crowneplaza.jpg"
  },

  doubletree: {
    nombre: "DoubleTree by Hilton Managua",
    descripcion: "Hotel moderno con restaurante y piscina al aire libre.",
    servicios: [
      "Wi-Fi gratis", "Restaurante en sitio", "Piscina al aire libre",
      "Gimnasio", "Salas de reuniones", "Conserjería"
    ],
    contacto: {
      telefono: "+505 2280 9810",
      correo: "MGANA_DT_Hotel@hilton.com"
    },
    imagen: "../Imagenes/doubletree.jpg"
  }
};

// ------ Funciones ------
function abrirModal(id) {
  const hotel = hoteles[id];
  document.getElementById("modal-title").textContent = hotel.nombre;

  mostrarTab('descripcion', id);

  document.getElementById("modal").style.display = "block";
  document.getElementById("modal").dataset.hotel = id;
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function mostrarTab(tab, id = null) {
  if (!id) id = document.getElementById("modal").dataset.hotel;
  const hotel = hoteles[id];

  const body = document.getElementById("modal-body");

  if (tab === "descripcion") {
    body.innerHTML = `
      <p>${hotel.descripcion}</p>
      <img src="${hotel.imagen}" alt="${hotel.nombre}" style="width:100%;border-radius:8px;margin-top:10px;">
    `;
  } else if (tab === "servicios") {
    body.innerHTML = `
      <ul>${hotel.servicios.map(s => `<li>${s}</li>`).join("")}</ul>
    `;
  } else if (tab === "contacto") {
    body.innerHTML = `
      <p><b>Teléfono:</b> ${hotel.contacto.telefono}</p>
      <p><b>Correo:</b> ${hotel.contacto.correo}</p>
    `;
  }

  document.querySelectorAll(".modal-tabs .tab").forEach(btn => btn.classList.remove("active"));
  document.querySelector(`.modal-tabs .tab:nth-child(${tab === "descripcion" ? 1 : tab === "servicios" ? 2 : 3})`).classList.add("active");
}
// ------ Mostrar/Ocultar modal ------

// Aseguramos que el modal arranque oculto
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
});

// Cerrar modal con la X
document.querySelector(".cerrar").addEventListener("click", cerrarModal);

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    cerrarModal();
  }
});
