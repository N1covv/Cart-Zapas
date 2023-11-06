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
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <p>${producto.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <p>${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="carrito-eliminar" id="${producto.id}" >Eliminar productos</button>
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

    productosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    cargarLosProductos()
}

function totalCompra() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}