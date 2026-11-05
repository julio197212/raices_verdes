/**
 * RAÍCES VERDES - SCRIPT BOTÁNICO COMPLETO
 * Incluye:
 * 1. Simulación física interactiva de Hojas y Pétalos animados cayendo.
 * 2. Catálogo dinámico de Plantas y Flores con soporte de descripciones ocultas.
 * 3. Carrito de compras reactivo con persistencia en localStorage.
 * 4. Integración de checkout directa con WhatsApp (Nequi, Daviplata, Contraentrega).
 */

// ========================================================
// 1. CONFIGURACIÓN DEL NEGOCIO
// ========================================================
const BOTANICA_CONFIG = {
  nombreNegocio: "Raíces Verdes",
  telefonoWhatsApp: "573102712361",
  numeroNequi: "310 271 2361",
  numeroDaviplata: "310 271 2361"
};

// ========================================================
// 2. DATASET COMPLETO DE PLANTAS Y FLORES
// ========================================================
const CATALOGO = [
  // --- PLANTAS DE INTERIOR ---
  {
    id: "planta-1",
    tipo: "plantas",
    categoria: "interior",
    nombre: "Monstera Deliciosa",
    nombreCientifico: "Monstera deliciosa",
    precio: 60000,
    imagenLocal: "imagenes1/monstera.png",
    imagenWeb: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80",
    descripcion: "Perfecta para salones iluminados. Hojas grandes y perforadas con patrones tropicales únicos.",
    cuidados: "Luz indirecta brillante, riego moderado cuando el sustrato superior esté seco."
  },
  {
    id: "planta-2",
    tipo: "plantas",
    categoria: "interior",
    nombre: "Potus",
    nombreCientifico: "Epipremnum aureum",
    precio: 55000,
    imagenLocal: "imagenes1/potus.png",
    imagenWeb: "https://images.unsplash.com/photo-1596724853039-3a3fef57dfa0?auto=format&fit=crop&w=700&q=80",
    descripcion: "Planta trepadora o colgante siempreverde que utiliza raíces aéreas para sostenerse. Muy resistente y purificadora.",
    cuidados: "Tolera sombra parcial y riegos espaciados. Ideal para principiantes."
  },
  {
    id: "planta-3",
    tipo: "plantas",
    categoria: "interior",
    nombre: "Helecho Boston",
    nombreCientifico: "Nephrolepis exaltata",
    precio: 70000,
    imagenLocal: "imagenes1/helecho.png",
    imagenWeb: "https://images.unsplash.com/photo-1599824634479-7f39446eb022?auto=format&fit=crop&w=700&q=80",
    descripcion: "Plantas vasculares frondosas sin flores ni semillas, ideales para entornos con buena humedad ambiental.",
    cuidados: "Pulverizar sus frondas con agua y mantener el sustrato húmedo sin encharcar."
  },

  // --- PLANTAS DE EXTERIOR ---
  {
    id: "planta-4",
    tipo: "plantas",
    categoria: "exterior",
    nombre: "Geranios Coloridos",
    nombreCientifico: "Pelargonium",
    precio: 45000,
    imagenLocal: "imagenes1/geranio.png",
    imagenWeb: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=700&q=80",
    descripcion: "Plantas perennes muy populares por sus floraciones continuas, colores vivos y agradable aroma.",
    cuidados: "Pleno sol y riego regular evitando mojar las hojas."
  },
  {
    id: "planta-5",
    tipo: "plantas",
    categoria: "exterior",
    nombre: "Lengua de Suegra (Sansevieria)",
    nombreCientifico: "Dracaena trifasciata",
    precio: 60000,
    imagenLocal: "imagenes1/lengua.png",
    imagenWeb: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=700&q=80",
    descripcion: "Planta perenne extremadamente resistente de origen africano. Produce oxígeno durante la noche.",
    cuidados: "Riego muy escaso (cada 15 a 20 días). Tolera sol directo o sombra."
  },
  {
    id: "planta-6",
    tipo: "plantas",
    categoria: "exterior",
    nombre: "Ficus Lyrata",
    nombreCientifico: "Ficus lyrata",
    precio: 80000,
    imagenLocal: "imagenes1/ficus.png",
    imagenWeb: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=700&q=80",
    descripcion: "Elegante y de porte arbóreo con hojas en forma de violín. Aporta altura y distinción botánica a cualquier espacio.",
    cuidados: "Luz muy brillante sin sol abrasador directo y riego moderado."
  },

  // --- FLORES DE JARDÍN ---
  {
    id: "flor-1",
    tipo: "flores",
    categoria: "jardin",
    nombre: "Tulipanes Holandeses",
    nombreCientifico: "Tulipa",
    precio: 40000,
    imagenLocal: "imagenes1/tulipan.png",
    imagenWeb: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=80",
    descripcion: "Famoso mundialmente por sus flores simétricas de colores vibrantes y tallos elegantes.",
    cuidados: "Prefieren clima fresco, sol suave y sustrato bien drenado."
  },
  {
    id: "flor-2",
    tipo: "flores",
    categoria: "jardin",
    nombre: "Rosas de Jardín Premium",
    nombreCientifico: "Rosa",
    precio: 50000,
    imagenLocal: "imagenes1/rosa.png",
    imagenWeb: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80",
    descripcion: "Famosa en todo el mundo por su inigualable belleza aterciopelada y fragancia envolvente.",
    cuidados: "Mínimo 6 horas de sol diario y poda regular de capullos marchitos."
  },
  {
    id: "flor-3",
    tipo: "flores",
    categoria: "jardin",
    nombre: "Orquídeas Phalaenopsis",
    nombreCientifico: "Orchidaceae",
    precio: 90000,
    imagenLocal: "imagenes1/orquidia.png",
    imagenWeb: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=700&q=80",
    descripcion: "Una de las familias botánicas más exóticas y admiradas, con floraciones duraderas de más de dos meses.",
    cuidados: "Riego por inmersión semanal, corteza de pino y luz filtrada."
  },

  // --- FLORES DE CORTE ---
  {
    id: "flor-4",
    tipo: "flores",
    categoria: "corte",
    nombre: "Claveles Aromáticos",
    nombreCientifico: "Dianthus caryophyllus",
    precio: 35000,
    imagenLocal: "imagenes1/clavel.png",
    imagenWeb: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80",
    descripcion: "Familia de las cariofiláceas muy apreciada por sus pétalos rizados y su resistencia en florero.",
    cuidados: "Cambiar el agua del florero cada dos días y cortar los tallos en diagonal."
  },
  {
    id: "flor-5",
    tipo: "flores",
    categoria: "corte",
    nombre: "Azucenas Blancas (Lirios)",
    nombreCientifico: "Lilium candidum",
    precio: 65000,
    imagenLocal: "imagenes1/azucena.png",
    imagenWeb: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=700&q=80",
    descripcion: "Familia de las liliáceas, famosa por sus grandes flores en forma de trompeta y su perfume intenso.",
    cuidados: "Conservar en agua limpia en espacios frescos y retirar los estambres de polen."
  },
  {
    id: "flor-6",
    tipo: "flores",
    categoria: "corte",
    nombre: "Astromelias Silvestres",
    nombreCientifico: "Alstroemeria",
    precio: 75000,
    imagenLocal: "imagenes1/astromelia.png",
    imagenWeb: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80",
    descripcion: "Conocida como Lirio de los Incas. Flor andina de gran durabilidad y variados matices jaspeados.",
    cuidados: "Excelente vida en florero (hasta 2 semanas con agua fresca)."
  }
];

// ========================================================
// 3. ESTADO GLOBAL
// ========================================================
let tipoActivo = "todas"; // "todas", "plantas", "flores"
let subfiltroActivo = "todos";
let carrito = JSON.parse(localStorage.getItem("raices_verdes_cart") || "[]");

// ========================================================
// 4. ANIMACIÓN FLOTANTE DE HOJAS Y PÉTALOS EN CANVAS
// ========================================================
function iniciarAnimacionPetalosYHojas() {
  const canvas = document.getElementById("canvas-petalos");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let ancho = (canvas.width = window.innerWidth);
  let alto = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    ancho = canvas.width = window.innerWidth;
    alto = canvas.height = window.innerHeight;
  });

  // Ratón interactivo para brisa suave
  let mouse = { x: ancho / 2, y: alto / 2, moviendose: false };
  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.moviendose = true;
    clearTimeout(mouse.timer);
    mouse.timer = setTimeout(() => (mouse.moviendose = false), 800);
  });

  const numParticulas = 32;
  const particulas = [];

  class ParticulaBotanica {
    constructor() {
      this.reiniciar(true);
    }

    reiniciar(inicial = false) {
      this.x = Math.random() * ancho;
      this.y = inicial ? Math.random() * alto : -30;
      this.tamano = 10 + Math.random() * 16;
      this.velocidadY = 0.8 + Math.random() * 1.4;
      this.velocidadX = -0.5 + Math.random() * 1;
      this.angulo = Math.random() * Math.PI * 2;
      this.velocidadRotacion = (Math.random() - 0.5) * 0.03;
      this.oscilacion = Math.random() * Math.PI * 2;
      this.velocidadOscilacion = 0.02 + Math.random() * 0.02;
      this.amplitudOscilacion = 1 + Math.random() * 2;
      this.tipo = Math.random() > 0.45 ? "hoja" : "petalo";
      this.opacidad = 0.45 + Math.random() * 0.45;

      // Colores botánicos y florales
      if (this.tipo === "hoja") {
        const tonosVerde = ["#3b7548", "#2d5a37", "#5c946e", "#6fa380"];
        this.color = tonosVerde[Math.floor(Math.random() * tonosVerde.length)];
      } else {
        const tonosPetalo = ["#f2b5a7", "#e89284", "#f4c6be", "#e08492"];
        this.color = tonosPetalo[Math.floor(Math.random() * tonosPetalo.length)];
      }
    }

    actualizar() {
      this.oscilacion += this.velocidadOscilacion;
      this.x += Math.sin(this.oscilacion) * this.amplitudOscilacion + this.velocidadX;
      this.y += this.velocidadY;
      this.angulo += this.velocidadRotacion;

      // Brisa interactiva al mover el mouse
      if (mouse.moviendose) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const fuerza = (140 - dist) / 140;
          this.x += (dx / dist) * fuerza * 3;
          this.y += (dy / dist) * fuerza * 2;
        }
      }

      if (this.y > alto + 40 || this.x < -40 || this.x > ancho + 40) {
        this.reiniciar();
      }
    }

    dibujar() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angulo);
      ctx.globalAlpha = this.opacidad;

      if (this.tipo === "hoja") {
        // Hoja verde con curva bezier y nervadura central
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.tamano);
        ctx.quadraticCurveTo(this.tamano * 0.75, 0, 0, this.tamano);
        ctx.quadraticCurveTo(-this.tamano * 0.75, 0, 0, -this.tamano);
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -this.tamano * 0.85);
        ctx.lineTo(0, this.tamano * 0.85);
        ctx.stroke();
      } else {
        // Pétalo floral suave
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.tamano * 0.6, -this.tamano * 0.8, -this.tamano * 0.4, -this.tamano * 1.2, 0, -this.tamano * 1.3);
        ctx.bezierCurveTo(this.tamano * 0.4, -this.tamano * 1.2, this.tamano * 0.6, -this.tamano * 0.8, 0, 0);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < numParticulas; i++) {
    particulas.push(new ParticulaBotanica());
  }

  function bucleAnimacion() {
    ctx.clearRect(0, 0, ancho, alto);
    particulas.forEach(p => {
      p.actualizar();
      p.dibujar();
    });
    requestAnimationFrame(bucleAnimacion);
  }

  bucleAnimacion();
}

// ========================================================
// 5. RENDERIZADO DEL CATÁLOGO
// ========================================================
function renderizarSubfiltros() {
  const contenedor = document.getElementById("subfiltros-contenedor");
  if (!contenedor) return;

  let opciones = [{ label: "Todos los ambientes / tipos", val: "todos" }];

  if (tipoActivo === "plantas") {
    opciones = [
      { label: "Todas las plantas", val: "todos" },
      { label: "Interior", val: "interior" },
      { label: "Exterior", val: "exterior" }
    ];
  } else if (tipoActivo === "flores") {
    opciones = [
      { label: "Todas las flores", val: "todos" },
      { label: "Flores de Jardín", val: "jardin" },
      { label: "Flores de Corte", val: "corte" }
    ];
  } else {
    opciones = [
      { label: "Todo", val: "todos" },
      { label: "Interior", val: "interior" },
      { label: "Exterior", val: "exterior" },
      { label: "Jardín", val: "jardin" },
      { label: "Corte", val: "corte" }
    ];
  }

  contenedor.innerHTML = opciones
    .map(
      op => `
    <button class="btn-subfiltro ${op.val === subfiltroActivo ? "activo" : ""}" 
            onclick="seleccionarSubfiltro('${op.val}')">
      ${op.label}
    </button>
  `
    )
    .join("");
}

function renderizarProductos() {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;

  const productosFiltrados = CATALOGO.filter(item => {
    const coincideTipo = tipoActivo === "todas" || item.tipo === tipoActivo;
    const coincideSub = subfiltroActivo === "todos" || item.categoria === subfiltroActivo;
    return coincideTipo && coincideSub;
  });

  if (productosFiltrados.length === 0) {
    contenedor.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-texto-muted);">
        <p style="font-size: 2.2rem;">🌱</p>
        <p>No se encontraron especies bajo este filtro.</p>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = productosFiltrados
    .map(prod => `
    <article class="tarjeta-planta" id="tarjeta-${prod.id}">
      <div class="imagen-wrap" onclick="toggleDescripcion('${prod.id}')" title="Clic para ver detalles">
        <span class="badge-categoria">${prod.tipo === "flores" ? "🌸 " + prod.categoria : "🌿 " + prod.categoria}</span>
        <img src="${prod.imagenLocal}" 
             alt="${prod.nombre}" 
             class="imagen-planta-click"
             loading="lazy"
             onerror="this.onerror=null; this.src='${prod.imagenWeb}'">
      </div>
      <div class="info-planta">
        <h3 onclick="toggleDescripcion('${prod.id}')">${prod.nombre}</h3>
        <small style="color:var(--color-texto-muted); font-style:italic; margin-bottom:8px; display:block;">
          (${prod.nombreCientifico})
        </small>
        <p class="descripcion-planta">${prod.descripcion}</p>

        <!-- Descripción oculta que se despliega con el clic -->
        <div class="descripcion-oculta" id="desc-${prod.id}">
          <p><strong>💡 Cuidados botánicos:</strong> ${prod.cuidados}</p>
        </div>

        <div class="producto-pie">
          <span class="precio">$${prod.precio.toLocaleString("es-CO")} COP</span>
          <button class="btn-agregar-carrito" onclick="agregarAlCarrito('${prod.id}')" title="Añadir al carrito">
            🛒
          </button>
        </div>
      </div>
    </article>
  `)
    .join("");
}

function cambiarTipoCatalogo(tipo) {
  tipoActivo = tipo;
  subfiltroActivo = "todos";
  document.querySelectorAll(".btn-tipo-cat").forEach(btn => btn.classList.remove("activo"));
  const btnActivo = document.getElementById(`tab-${tipo}`);
  if (btnActivo) btnActivo.classList.add("activo");

  renderizarSubfiltros();
  renderizarProductos();
}

function filtrarTipo(tipo) {
  cambiarTipoCatalogo(tipo);
}

function seleccionarSubfiltro(val) {
  subfiltroActivo = val;
  renderizarSubfiltros();
  renderizarProductos();
}

// Clic en la imagen para abrir/cerrar detalles
function toggleDescripcion(id) {
  const descElement = document.getElementById(`desc-${id}`);
  if (descElement) {
    descElement.classList.toggle("mostrar");
  }
}

// ========================================================
// 6. GESTIÓN DEL CARRITO DE COMPRAS
// ========================================================
function guardarCarrito() {
  localStorage.setItem("raices_verdes_cart", JSON.stringify(carrito));
  actualizarInterfazCarrito();
}

function agregarAlCarrito(idProducto) {
  const producto = CATALOGO.find(p => p.id === idProducto);
  if (!producto) return;

  const existente = carrito.find(item => item.id === idProducto);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  guardarCarrito();
  mostrarToast(`¡${producto.nombre} agregado al carrito! 🌱`);
}

function cambiarCantidadCarrito(index, cambio) {
  if (!carrito[index]) return;
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
}

function actualizarInterfazCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  const totalPrecio = document.getElementById("total-precio");
  const cartCounter = document.getElementById("cart-counter");
  const itemsCountText = document.getElementById("items-count-text");

  const totalItems = carrito.reduce((acc, it) => acc + it.cantidad, 0);
  const totalMonto = carrito.reduce((acc, it) => acc + it.precio * it.cantidad, 0);

  if (cartCounter) cartCounter.innerText = totalItems;
  if (itemsCountText) itemsCountText.innerText = `${totalItems} ${totalItems === 1 ? "artículo" : "artículos"}`;
  if (totalPrecio) totalPrecio.innerText = totalMonto.toLocaleString("es-CO");

  if (!listaCarrito) return;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = `<li class="carrito-vacio">El carrito está vacío. ¡Elige tus plantas o flores favoritas!</li>`;
    return;
  }

  listaCarrito.innerHTML = carrito
    .map(
      (item, idx) => `
    <li class="carrito-item">
      <div>
        <div class="item-nombre">${item.nombre}</div>
        <small style="color:var(--color-secundario); font-weight:600;">$${(item.precio * item.cantidad).toLocaleString("es-CO")} COP</small>
      </div>
      <div class="item-acciones">
        <button class="btn-qty" onclick="cambiarCantidadCarrito(${idx}, -1)">-</button>
        <span style="font-weight:700; min-width:18px; text-align:center;">${item.cantidad}</span>
        <button class="btn-qty" onclick="cambiarCantidadCarrito(${idx}, 1)">+</button>
        <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${idx})" title="Eliminar">🗑️</button>
      </div>
    </li>
  `
    )
    .join("");
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast-notificacion");
  if (!toast) return;
  toast.innerText = mensaje;
  toast.classList.add("mostrar");
  setTimeout(() => toast.classList.remove("mostrar"), 3200);
}

// ========================================================
// 7. CHECKOUT Y ENVÍO A WHATSAPP
// ========================================================
function verificarEntrega() {
  const metodoEntrega = document.getElementById("opciones-entrega").value;
  const grupoDireccion = document.getElementById("grupo-direccion");
  const inputDireccion = document.getElementById("cliente-direccion");

  if (metodoEntrega === "Recoger en Tienda") {
    if (grupoDireccion) grupoDireccion.style.display = "none";
    if (inputDireccion) inputDireccion.required = false;
  } else {
    if (grupoDireccion) grupoDireccion.style.display = "flex";
    if (inputDireccion) inputDireccion.required = true;
  }
}

function enviarPedidoWhatsApp(event) {
  event.preventDefault();

  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agrega tus plantas o flores antes de enviar el pedido.");
    return;
  }

  const nombre = document.getElementById("cliente-nombre").value.trim();
  const telefono = document.getElementById("cliente-telefono").value.trim();
  const metodoEntrega = document.getElementById("opciones-entrega").value;
  const direccionInput = document.getElementById("cliente-direccion");
  const direccion = direccionInput ? direccionInput.value.trim() : "";

  if (!nombre) {
    alert("Por favor ingresa tu nombre completo.");
    return;
  }

  if (metodoEntrega !== "Recoger en Tienda" && !direccion) {
    alert("Por favor ingresa una dirección para el envío.");
    return;
  }

  const totalCalculado = carrito.reduce((acc, it) => acc + it.precio * it.cantidad, 0);

  let mensaje = `🌿 *¡NUEVO PEDIDO EN RAÍCES VERDES!* 🌸\n`;
  mensaje += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  mensaje += `👤 *Cliente:* ${nombre}\n`;
  mensaje += `📞 *Teléfono:* ${telefono}\n`;
  mensaje += `🚚 *Modalidad:* ${metodoEntrega}\n`;
  if (metodoEntrega !== "Recoger en Tienda") {
    mensaje += `📍 *Dirección de Entrega:* ${direccion}\n`;
  }
  mensaje += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  mensaje += `🛒 *DETALLE DE PRODUCTOS:*\n`;

  carrito.forEach((it, i) => {
    mensaje += `${i + 1}. ${it.nombre} x${it.cantidad} ($${(it.precio * it.cantidad).toLocaleString("es-CO")})\n`;
  });

  mensaje += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  mensaje += `💰 *TOTAL A PAGAR:* $${totalCalculado.toLocaleString("es-CO")} COP\n\n`;

  if (metodoEntrega === "Transferencia Bancaria") {
    mensaje += `💳 *DATOS DE TRANSFERENCIA:*\n`;
    mensaje += `📱 Nequi: ${BOTANICA_CONFIG.numeroNequi}\n`;
    mensaje += `📱 Daviplata: ${BOTANICA_CONFIG.numeroDaviplata}\n`;
    mensaje += `_Por favor envíanos el comprobante por este chat para alistar tu pedido._`;
  } else if (metodoEntrega === "Pago Contraentrega") {
    mensaje += `📢 _Modalidad contraentrega seleccionada. Coordinaremos el despacho a tu dirección._`;
  } else {
    mensaje += `📍 _El cliente pasará a recoger el pedido al taller botánico._`;
  }

  const url = `https://wa.me/${BOTANICA_CONFIG.telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  carrito = [];
  guardarCarrito();
  mostrarToast("¡Pedido enviado a WhatsApp con éxito! 📲");
}

// ========================================================
// 8. INICIALIZACIÓN
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  iniciarAnimacionPetalosYHojas();
  renderizarSubfiltros();
  renderizarProductos();
  actualizarInterfazCarrito();
  verificarEntrega();
});
// === ENVÍO DE FORMULARIO DE CONTACTO A WHATSAPP ===
const formContacto = document.getElementById("formulario-contacto");

if (formContacto) {
  formContacto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre-contacto").value.trim();
    const telefono = document.getElementById("telefono-contacto").value.trim();
    const asunto = document.getElementById("asunto-contacto").value;
    const mensaje = document.getElementById("mensaje-contacto").value.trim();

    if (!nombre || !mensaje) {
      alert("Por favor completa tu nombre y el mensaje.");
      return;
    }

    // Tu número de WhatsApp de Raíces Verdes (código de país 573102712361)
    const numeroWhatsApp = "573102712361"; // 

    const texto = 
      `🌿 *Nueva Consulta - Raíces Verdes*\n\n` +
      `👤 *Nombre:* ${nombre}\n` +
      `📱 *WhatsApp del cliente:* ${telefono || "No especificado"}\n` +
      `📌 *Motivo:* ${asunto}\n` +
      `💬 *Mensaje:* ${mensaje}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");

    formContacto.reset();
  });
}
