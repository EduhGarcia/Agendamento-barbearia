const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

let alertAnnimation;
let userInfo = {
    email: '',
    name: '',
    alertAnnimation: ''
};

app.get('/message', function (req, res) {
    res.status(200).send(userInfo)
    userInfo.alertAnnimation = ''
})

app.post('/agendamento', async function (req, res) {
    const { date, time, service, typeService } = req.body
    const { email } = userInfo

    await prisma.agendamento.create({
        data: {
            data_agendada: date,
            horario: time,
            servico: service,
            tipo_servico: typeService,
            email: email,
        }
    })

    userInfo.alertAnnimation = "Agendamento Realizado!"

    res.status(201)
})

app.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body
        const indentifyUser = await prisma.usuario.findFirst({ where: { email } })

        if (!indentifyUser) {
            return res.send({ message: 'Usuário não encontrado' })
        } else if (indentifyUser.senha !== password) {
            return res.send({ message: 'Senha incorreta' })
        };

        userInfo.email = email
        userInfo.name = indentifyUser.nome

        res.status(200).send({ message: 'User found' })
    } catch (err) {
        return res.status(501).send({ message: 'Falha ao encontrar usuário' })
    }
})

app.post('/cadastro', async function (req, res) {
    const { name, email, password } = req.body
    const indentifyUser = await prisma.usuario.findFirst({ where: { email } })

    if (indentifyUser) {
        return res.send({ message: 'possui cadastro' })
    }

    userInfo.email = email
    userInfo.name = name

    await prisma.usuario.create({
        data: {
            nome: name,
            email: email,
            senha: password
        }
    })

    userInfo.alertAnnimation = "Cadastrado com sucesso!"

    res.status(201).send({ message: 'User create' })
})

app.listen(3001, () => console.log('servidor rodando'))