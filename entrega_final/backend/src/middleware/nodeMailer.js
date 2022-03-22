const {createTransport } = require ('nodemailer');
const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: 'guitarshopfinal@gmail.com',
        pass: 'gytesbuwhankxexr'
    },
})

const sendNodeMail = (email, subject, msg)=>{
    const mailOptions = {
        from: `Guitar Shop <guitarshopfinal@gmail.com>`,
        to: email,
        subject: subject,
    html:`<h1 style='text-align: center'>${msg}</h1>`
};
return transporter.sendMail(mailOptions);
}
module.exports = sendNodeMail;