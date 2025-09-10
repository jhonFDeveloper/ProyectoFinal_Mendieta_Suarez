let cartProducts = JSON.parse(localStorage.getItem("cart") || "[]");

const renderProducts = () => {
  let container = document.querySelector(".contenedor-productos-carrito");
  let contenidoHTML = "";

  cartProducts.forEach((producto) => {
    contenidoHTML += `
    <div class="producto">
     <div class="img-producto">
      <img src="${producto.imagen}" alt="${producto.nombre}">
     </div>
     <div class="info-producto">
       <h3>$${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}</h3>
       <h5>${producto.nombre}</h5>
       <p>Cantidad: ${producto.cantidad}</p>
       <button class="btn-eliminar" onclick="removeProduct(${producto.id})">Quitar Producto</button>
     </div>
    </div>        
        `;
  });

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