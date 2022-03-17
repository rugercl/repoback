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
    const { subject, carritoID, nombre, direccion, edad, telefono, usuario, admin, foto } = contentEmail
    const mailOptions = {
        from: `Guitar Shop <guitarshopfinal@gmail.com>`,
        to: usuario,
        subject: subject,
        html: `
            <div>
                    <h3 style='text-align: center'> Registro de Usuario </h3>
                <div>
                    Codigo del carrito de compra: ${carritoID} <br>
                    Nombre: ${nameUser(nombre)} <br>
                    Direccion: ${direccion} <br>
                    Edad: ${edad} <br>
                    Telefono: ${telefono} <br>
                    Correo Electronico: ${usuario} <br>
                    Es Admin ? :${admin === false ? ' NO' : ' SI'} <br>
                    Avatar: ${foto}
                  </div>
             </div>   
        `
    };

    return transporter.sendMail(mailOptions);
}
module.exports = sendNodeMail;