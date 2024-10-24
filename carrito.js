let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)

const carritoVacio = document.querySelector("#carritoVacio")
const carritoProductos = document.querySelector("#carritoProducto")
const carritoAcciones = document.querySelector("#carrito-acciones")
let eliminarProducto = document.querySelector(".carrito-eliminar")
const botonDeVaciar = document.querySelector(".carrito-vaciar")
const compraTotal = document.querySelector("#total")

function cargarLosProductos(){
    if(productosEnCarrito && productosEnCarrito.length > 0) {

        carritoVacio.classList.add("disabled")
        carritoProductos.classList.remove("disabled")
        carritoAcciones.classList.remove("disabled")

        carritoProductos.innerHTML = ""

        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div")
            div.classList.add("carrito-productos")
            div.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.titulo}" class="carrito-imagen">
                    <div class="carrito-producto-item">
                        <h3>${producto.titulo}</h3>
                    </div>  
                    <div class="carrito-productos-cantidad">
                        <p> Amount: ${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <p>Price: ${producto.precio}usd</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <p>Total: ${producto.precio * producto.cantidad}usd</p>
                    </div>
                    <button class="carrito-eliminar" id="${producto.id}" >Delete Product</button>
            `

            carritoProductos.append(div)
        })
    
    } else {
        carritoVacio.classList.remove("disabled")
        carritoProductos.classList.add("disabled")
        carritoAcciones.classList.add("disabled")
    }
    actualizarBotonEliminar()
    totalCompra()
}


cargarLosProductos()

function actualizarBotonEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-eliminar")
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex (producto => producto.id === idBoton)

    productosEnCarrito.splice(index, 1)
    cargarLosProductos()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonDeVaciar.addEventListener("click", vaciarElCarrito)

function vaciarElCarrito () {

    Swal.fire({
        title: "Estas seguro?",
        text: "Se eliminaran todo tus productos!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
            cargarLosProductos()    
          Swal.fire({
            title: "Eliminado!",
            text: "Todos tus productos se eliminaron.",
            icon: "success"
          });
        }
      });
}

function totalCompra() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `${totalCalculado}usd`
}