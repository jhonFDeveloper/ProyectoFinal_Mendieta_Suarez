let cartProducts = JSON.parse(localStorage.getItem("cart") || "[]");

const renderProducts = () => {
  let container = document.querySelector(".contenedor-productos-carrito");
  let btnEmpty = document.getElementById("vaciar");
  let contenidoHTML = "";

  if (cartProducts.length === 0) {
    contenidoHTML = `
      <div class="empty-cart-message">
        <h2>El carrito está vacío</h2>
        <p>Una vez que añadas algo a tu carrito, aparecerá aquí. ¿Listo para empezar?</p>
        <a href="/index.html"><button class="btn-eliminar">Comenzar → </button></a>
      </div>
    `;
    btnEmpty.style.display = "none";
  } else {
    cartProducts.forEach((producto) => {
      contenidoHTML += `
        <div class="producto">
         <div class="container-btn-eliminar">
          <button class="btn-eliminar" onclick="removeProduct(${producto.id})"><i class="fa-solid fa-x"></i></button>
         </div>
          <div class="img-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
          </div>
          <div class="info-producto">
            <h3>$${producto.precio * producto.cantidad}</h3>
            <h5>${producto.nombre}</h5>
            <p>Cantidad: ${producto.cantidad}</p>
            
          </div>
        </div>
      `;
    });
    btnEmpty.style.display = "block";
  }

  container.innerHTML = contenidoHTML;
};

renderProducts();

let btnEmpty = document.getElementById("vaciar");
btnEmpty.addEventListener("click", () => {
  localStorage.removeItem("cart");
  cartProducts = [];
  renderProducts();
});

const removeProduct = (id) => {
  let productoEnCarrito = cartProducts.find((producto) => producto.id === id);

  if (productoEnCarrito) {
    if (productoEnCarrito.cantidad > 1) {
      productoEnCarrito.cantidad -= 1;
    } else {
      cartProducts = cartProducts.filter((producto) => producto.id !== id);
    }
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    renderProducts();
  }
};
