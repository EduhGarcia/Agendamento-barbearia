const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

let userInfo = {
    email: null,
    name: '',
    alertAnnimation: ''
};

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

app.post('/agendamento', async function (req, res) {
    const { date, time, service, typeService } = req.body
    const { email } = userInfo

   

    const addScheduling = await prisma.agendamento.create({
        data: {
            data_agendada: date,
            horario: time,
            servico: service,
            tipo_servico: typeService,
            email: email,
        }
    })

    console.log(addScheduling);
    userInfo.alertAnnimation = "Agendamento Realizado!"

    res.status(201)
})

app.get('/horarios/:date', async function (req, res) {
    const dateInput = new Date(req.params.date);

    if (dateInput == 'Invalid Date') return

    const searchTimes = await prisma.agendamento.findMany({
        where: {
            data_agendada: {
                equals: dateInput
            }
        }
    })

    return res.status(200).send(searchTimes)
})

app.delete('/cancelar-agendamento/:id', async function (req, res) {
    userInfo.alertAnnimation = "Agendamento Cancelado"

    const id = Number(req.params.id);
    
    await prisma.agendamento.delete({ where: { id } })

    res.status(200)
})

app.get('/historico', async function (req, res) {
    const historicUser = await prisma.agendamento.findMany({
        where: {
            email: {
                equals: userInfo.email
            }
        }
    })

    if(historicUser.length === 0) {
        return res.send({message: 'Nenhum agendamento realizado'})
    }

    return res.status(200).send(historicUser)
})

app.get('/message', function (req, res) {
    res.status(200).json(userInfo)
    userInfo.alertAnnimation = ''
})

app.listen(3001, () => console.log('servidor rodando'))