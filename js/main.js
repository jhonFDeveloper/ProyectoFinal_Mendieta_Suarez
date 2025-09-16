let productos = [];

const loadProducts = async () => {
  try {
    const response = await fetch("js/products.json");
    productos = await response.json();
    renderProducts();
  } catch (error) {
    Toastify({
      text: "Error cargando productos, usando datos locales.",
      duration: 3000,
      gravity: "bottom",
      position: "left",
      style: { background: "linear-gradient(to right, #ff5e62, #f06292)" },
    }).showToast();
    productos = [];
    renderProducts();
  }
};

const renderProducts = () => {
  const contenedorProductos = document.querySelector(".contenedor-productos");
  let contenidoHTML = "";

  productos.forEach((producto) => {
    contenidoHTML += `
      <div class="producto">
        <div class="img-producto">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div>
          <h3>$${producto.precio}</h3>
          <h5>${producto.nombre}</h5>
          <button class="btn-agregar" onclick="addProduct(${producto.id});addToCart()">
            Agregar <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    `;
  });

  if (contenedorProductos) {
    contenedorProductos.innerHTML = contenidoHTML;
  }
};

let count = 0;
const badge = document.getElementById("cart-badge");

function addToCart() {
  count++;
  badge.textContent = count;
}

const addProduct = (id) => {
  const productoEncontrado = productos.find((producto) => producto.id === id);
  let carrito = JSON.parse(localStorage.getItem("cart") || "[]");

  if (productoEncontrado) {
    let productoEnCarrito = carrito.find((item) => item.id === id);

    if (productoEnCarrito) {
      if (productoEnCarrito.cantidad < productoEncontrado.stock) {
        productoEnCarrito.cantidad + 1;
        return;
      }
    } else {
      carrito.push({ ...productoEncontrado, cantidad: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(carrito));
  }
};

loadProducts();
