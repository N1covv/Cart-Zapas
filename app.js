let productos = []

fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data
        cargarLosProductos(productos)
    })

const contenedorProductos = document.querySelector(".contenedor")
let agregarProductos = document.querySelectorAll(".agregar-producto")
const numero = document.querySelector("#numero")


function cargarLosProductos() {

    productos.forEach(producto => {

        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="zapas">
            <p class="producto">${producto.titulo}</p>
            <p class="precio">$${producto.precio}</p>
            <button class="agregar-producto"id="${producto.id}">Agregar al carrito</button> 
        `
        contenedorProductos.append(div)

    })

    agregarProductos2()
}


function agregarProductos2() {
    agregarProductos = document.querySelectorAll(".agregar-producto")
     
    agregarProductos.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}


let productosEnCarrito
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS)
    actualizarNumero()
} else {
    productosEnCarrito = []
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton)

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++
    }else {
        productoAgregado.cantidad = 1 
        productosEnCarrito.push(productoAgregado)
    }

    actualizarNumero()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}


function actualizarNumero () {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numero.innerText = nuevoNumero
}