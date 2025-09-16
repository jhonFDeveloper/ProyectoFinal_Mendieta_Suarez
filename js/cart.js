let cartProducts = JSON.parse(localStorage.getItem("cart") || "[]");
let productos = []; 

const loadProducts = async () => {
  try {
    const response = await fetch('js/products.json');
    productos = await response.json();
    renderProducts();
  } catch (error) {
    Toastify({
      text: 'Error cargando datos de stock.',
      duration: 3000,
      gravity: "bottom",
      position: "left",
      style: { background: "linear-gradient(to right, #ff5e62, #f06292)" },
    }).showToast();
  }
};

const calculateTotal = () => {
  return cartProducts.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
};

const renderProducts = () => {
  const container = document.querySelector(".contenedor-productos-carrito");
  const btnEmpty = document.getElementById("vaciar");
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
      const productoStock = productos.find(p => p.id === producto.id)?.stock || producto.stock;
      let options = '';
      for (let i = 1; i <= productoStock; i++) {
        options += `<option value="${i}" ${producto.cantidad === i ? 'selected' : ''}>${i}</option>`;
      }
      contenidoHTML += `
        <div class="producto">
          <div class="container-btn-eliminar">
            <button class="btn-eliminar" onclick="removeProduct(${producto.id})">
              <i class="fa-solid fa-x"></i>
            </button>
          </div>
          <div class="img-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
          </div>
          <div class="info-producto">
            <h3>$${producto.precio * producto.cantidad}</h3>
            <h5>${producto.nombre}</h5>
            <p>Cantidad: 
              <select class="quantity-select" data-id="${producto.id}" onchange="updateQuantity(${producto.id}, this.value)">
                ${options}
              </select>
            </p>
          </div>
        </div>
      `;
    });
    contenidoHTML += `
      <div class="total-section">
        <h3>Total: $${calculateTotal()}</h3>
        <button id="checkout-btn" class="btn-clear">Finalizar Compra</button>
      </div>
    `;
    btnEmpty.style.display = "block";
  }

  if (container) {
    container.innerHTML = contenidoHTML;
    attachCheckoutEvent();
    updateCartCount();
<<<<<<< HEAD
  }
};


const updateQuantity = (id, newQuantity) => {
  const productoEnCarrito = cartProducts.find((producto) => producto.id === id);
  const productoStock = productos.find(p => p.id === id)?.stock || productoEnCarrito.stock;

  if (productoEnCarrito) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity <= productoStock) {
      productoEnCarrito.cantidad = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      renderProducts();      
    }     
    updateCartCount();
  }
};


const removeProduct = (id) => {
  cartProducts = cartProducts.filter((producto) => producto.id !== id);
  localStorage.setItem("cart", JSON.stringify(cartProducts));
  renderProducts();
};


document.getElementById("vaciar").addEventListener("click", () => {
  localStorage.removeItem("cart");
  cartProducts = [];
  renderProducts();
});


const attachCheckoutEvent = () => {
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const total = calculateTotal();
      Toastify({
        text: `¡Compra simulada exitosa! Total pagado: $${total}. Tu pedido ha sido procesado.`,
        duration: 4000,
        gravity: "bottom",
        position: "left",
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
      }).showToast();
      localStorage.removeItem("cart");
      cartProducts = [];
      renderProducts();
      setTimeout(() => window.location.href = 'index.html', 2000);
    });
  }
};

=======
  }
};


const updateQuantity = (id, newQuantity) => {
  const productoEnCarrito = cartProducts.find((producto) => producto.id === id);
  const productoStock = productos.find(p => p.id === id)?.stock || productoEnCarrito.stock;

  if (productoEnCarrito) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity <= productoStock) {
      productoEnCarrito.cantidad = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      renderProducts();      
    }     
    updateCartCount();
  }
};


const removeProduct = (id) => {
  cartProducts = cartProducts.filter((producto) => producto.id !== id);
  localStorage.setItem("cart", JSON.stringify(cartProducts));
  renderProducts();
};

document.getElementById("vaciar").addEventListener("click", () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas vaciar el carrito? Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    customClass: {
      popup: 'swal2-popup-custom',
      title: 'swal2-title-custom',
      content: 'swal2-content-custom',
      confirmButton: 'swal2-confirm-custom',
      cancelButton: 'swal2-cancel-custom'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("cart");
      cartProducts = [];
      renderProducts();
    }
  });
});

const attachCheckoutEvent = () => {
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const total = calculateTotal();
      Swal.fire({
        title: '¡Compra Exitosa!',
        text: `Total pagado: $${total}. Tu pedido ha sido procesado.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'swal2-popup-custom',
          title: 'swal2-title-custom',
          content: 'swal2-content-custom',
          confirmButton: 'swal2-confirm-custom'
        }
      }).then(() => {
        localStorage.removeItem("cart");
        cartProducts = [];
        renderProducts();
        window.location.href = 'index.html';
      });
    });
  }
};


>>>>>>> 134364d (Se agregan modales de confirmación)
const updateCartCount = () => {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const totalItems = cartProducts.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems > 0 ? totalItems : '';
  }
};

loadProducts();
renderProducts();
loadHeader();