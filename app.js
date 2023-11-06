const productos = [
    {
        id: "air-Force1",
        titulo:"Air Force 1",
        imagen:"./img/Air Force 1.jfif",
        precio: 99999
    },
    {
        id: "nike-sb",
        titulo:"Nike SB",
        imagen:"./img/NikeSB.jfif",
        precio: 110000
    },
    {
        id: "nikesb-travis",
        titulo:"Nike SB Travis Scott",
        imagen:"./img/NikeSB TravisSc.jfif",
        precio: 150000
    },
    {
        id: "jordan-1",
        titulo:"Nike Jordan 1",
        imagen:"./img/Jordan 1.jfif",
        precio: 120000
    },
    {
        id: "jordan-retro-4",
        titulo:"Nike Jordan Retro 4",
        imagen:"./img/Jordan Retro4.jfif",
        precio: 130000
    },
    {
        id: "adidas-flow",
        titulo:"Adidas 84 Forum Low",
        imagen:"./img/Adidas 84 FLow.jfif",
        precio: 89000
    },
    {
        id: "dc-court",
        titulo:"Dc Court Graffik",
        imagen:"./img/Dc Court Graffik.jfif",
        precio: 59990
    },
    {
        id: "dc-pensford",
        titulo:"Dc Pensford",
        imagen:"./img/Dc Pensford.jfif",
        precio: 55000
    },
    {
        id: "vans-sk8",
        titulo:"Vans SK8",
        imagen:"./img/Vans Sk8.jfif",
        precio: 60900
    }
]

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

cargarLosProductos()

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