const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const SMTP = require('./config/smtp')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: SMTP.port,
    secure: false,
    auth: {
        user: SMTP.user,
        pass: SMTP.pass
    },
    tls: {
      rejectUnauthorized: false  
    }
})

const app = express()
app.use((req,res,next) =>{
    console.log("Rodando CORS")
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors());
    next()
})

app.get('/2factors/:email', async (req, res) =>{
    
    let email = req.params.email
    //99 5 vezes
    let corpo = getRandomInt(1, 99999999).toString()
    async function sendEmail(){
        const mailSent = await transporter.sendMail({
            text: corpo,
            subject: "Autorização para usar o Orkut Clone", 
            from: "Orkut Clone <orkutclone@gmail.com>",
            to: [email]    
        })
        console.log(mailSent)
    }
    console.log(`Email: ${email} Corpo: ${corpo}`)
    sendEmail()
    res.send({cod: corpo})
})


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})
