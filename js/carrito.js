// ===========================
//  SISTEMA DE CARRITO GLOBAL
// ===========================

// Cargar carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const countCarrito = document.getElementById("countCarrito");

// ===========================
//  ACTUALIZAR INTERFAZ
// ===========================
function actualizarCarrito() {
    if (!listaCarrito) return;

    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        const li = document.createElement("li");
        li.className = "list-group-item bg-dark text-light d-flex justify-content-between";
        li.innerHTML = `
            ${item.nombre} - ${item.precio.toLocaleString()} COP
            <button class="btn btn-sm btn-danger" onclick="eliminarItem(${index})">X</button>
        `;

        listaCarrito.appendChild(li);
    });

    totalCarrito.textContent = total.toLocaleString();
    countCarrito.textContent = carrito.length;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ===========================
//  AÑADIR PRODUCTO
// ===========================
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

// ===========================
//  ELIMINAR PRODUCTO
// ===========================
function eliminarItem(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// ===========================
//  Detectar clic en botones
// ===========================
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-comprar")) {

        const nombre = e.target.dataset.nombre;
        const precio = Number(e.target.dataset.precio);

        agregarAlCarrito(nombre, precio);
    }
});

// Cargar carrito al iniciar la página
actualizarCarrito();

