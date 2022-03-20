const {createTransport } = require ('nodemailer');
const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: 'guitarshopfinal@gmail.com',
        pass: 'gytesbuwhankxexr'
    },
})

function nameUser(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const sendNodeMail = (contentEmail)=>{
    const { subject, nombre, usuario, pedidoFront } = contentEmail

const pedidoMap = pedidoFront.products.map(i =>
    `<div>
        id: ${i._id} <br>
        codigo: ${i.codigo} <br>
        descripcion: ${i.descripcion}<br>
        nombre: ${i.nombre} <br>
        precio: ${i.precio} <br>
        stock: ${i.stock} 
    </div>`
)
const mailOptions = {
    from: `Guitar Shop <guitarshopfinal@gmail.com>`,
    to: usuario,
    subject: subject,
    html: `
        <div>
                <h3 style='text-align: center'> Registro del Pedido </h3>
            <div>
                Nombre: ${nameUser(nombre)} <br>
                Correo Electronico: ${usuario} <br>
                <h4 style='margin-bottom: 10px'>Pedido</h4>
                ${pedidoMap}
              </div>
         </div>   
    `
};

return transporter.sendMail(mailOptions);
}

module.exports = sendNodeMail;