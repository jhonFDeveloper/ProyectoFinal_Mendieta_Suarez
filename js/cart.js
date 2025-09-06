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
     <div class"info-producto">
       <h3>$${producto.precio}</h3>
       <h5>${producto.nombre}</h5>
       <button class="btn-eliminar" onclick="removeProduct(${producto.id})">Quitar Producto</button>
     </div>
        </div>        
        `;
  });

  container.innerHTML = contenidoHTML;
};
renderProducts();


let btnEmpty  = document.getElementById("vaciar");

btnEmpty.addEventListener("click" , () => {
localStorage.removeItem("cart");
cartProducts = [];
renderProducts();
});

const removeProduct = (id) => {
  let arrayPorductsRemove = cartProducts.filter((producto) => producto.id !== id);
  cartProducts = arrayPorductsRemove;
  localStorage.setItem("cart", cartProducts);
  renderProducts();
};