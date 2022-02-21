const socket = io.connect();

//Agregar libros al array
const agregaLibro = document.getElementById('agregaLibro')
agregaLibro.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        libro: agregaLibro[0].value,
        precio: agregaLibro[1].value,
        foto: agregaLibro[2].value
    }
    
    socket.emit('update', producto);    
    agregaLibro.reset()
})

socket.on('productos', productos => {
    //console.log(productos)
    
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    
    return fetch('../hbs/libros.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            
            return html            
        })
}

//Agregar mensajes al Array
const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = { autor: inputUsername.value, texto: inputMensaje.value }
    socket.emit('nuevoChat', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajes => {
    console.log(mensajes);
    const html = makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.autor}</b>
                [<span style="color:brown;">${mensaje.fecha}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
