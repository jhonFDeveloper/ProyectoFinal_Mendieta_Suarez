const productos = [
  { id: 1, nombre: "Procesador Intel Core i7", precio: 1200, stock: 15, imagen: "assets/core_i7.webp" },
  { id: 2, nombre: "Tarjeta Madre AORUS", precio: 600, stock: 10, imagen: "assets/motherboard.jpg" },
  { id: 3, nombre: "Memoria RAM 16GB DDR4 (2x8)", precio: 300, stock: 25, imagen: "assets/RAM.webp" },
  { id: 4, nombre: "Disco SSD 1TB", precio: 450, stock: 20, imagen: "assets/SSD.jpg" },
  { id: 5, nombre: "Fuente de Poder 750W", precio: 250, stock: 12, imagen: "assets/fuente.webp"},
  { id: 6, nombre: "Tarjeta Gráfica RTX 3060", precio: 1500, stock: 8, imagen: "assets/gpu.png" },
  { id: 7, nombre: "Gabinete ATX RGB", precio: 200, stock: 18, imagen: "assets/gabinete.png" },
  { id: 8, nombre: "Refrigeración Líquida", precio: 350, stock: 7, imagen: "assets/refrigeracion.png" },
  { id: 9, nombre: "Disco Duro 2TB HDD", precio: 280, stock: 22,imagen: "assets/hdd.webp" },
  { id: 10, nombre: "Monitor 27'' Full HD", precio: 800, stock: 9, imagen: "assets/monitor.webp"},
];

// Pofe te pido mis disculpas por entregarlo completo por temas laborales no le pude dedicar mucho tiempo al proyecto
// Prometo esforzarme mucho más

const renderProducts = () => {

  let contenedorProductos = document.querySelector(".contenedor-productos");
  let contenidoHTML = "";

  productos.forEach((producto) => {
    contenidoHTML += `
    <div class="producto">
     <div class="img-producto">
      <img src="${producto.imagen}" alt="${producto.nombre}">
     </div>
     <div >
       <h3>$${producto.precio}</h3>
       <h5>${producto.nombre}</h5>
       <button class="btn-agregar" onclick="addProduct(${producto.id})">Agregar al carrito</button>
     </div>
    </div>        
        `;
  });

  contenedorProductos.innerHTML = contenidoHTML;
};
renderProducts();

let carrito = JSON.parse(localStorage.getItem("cart") || "[]");

const addProduct = (id) => {
    let productoEncontrado = productos.find((producto) => producto.id === id);

  if (productoEncontrado) {
    carrito.push(productoEncontrado);
    localStorage.setItem("cart", JSON.stringify(carrito));   
    }
};