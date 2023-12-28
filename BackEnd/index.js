const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

let alertAnnimation;
let emailUser;

app.get('/agendamento', function (req, res) {
    res.status(200).json(alertAnnimation)
    alertAnnimation = { message: '' }
})

app.post('/agendamento', async function (req, res) {
    const {date, time, service, type_service} = req.body

    await prisma.agendamento.create({
        data: {
            data_agendada: date,
            horario: time,
            servico: service,
            tipo_servico: type_service,
            email: emailUser,

        }
    })

    alertAnnimation = { message: "Agendamento Realizado!" }

    res.status(201)
})

app.post('/cadastro', async function (req, res) {
    const { name, email, password } = req.body
    const indentifyUser = await prisma.usuario.findFirst({ where: { email } })

    if (indentifyUser) {
        return res.send({message: 'possui cadastro'})
    }

    emailUser = email

    // await prisma.usuario.create({
    //     data: {
    //         nome: name,
    //         email: email,
    //         senha: password
    //     }
    // })

    alertAnnimation = { message: "Cadastrado com sucesso!" }

    res.status(201)
})

app.listen(3001, () => console.log('servidor rodando'))