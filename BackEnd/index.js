const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")
const SwaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./gerenciamento-barbearia.json")

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())
app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocument))

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
            return res.send({ message: 'Usuário não encontrado' }).status(400)
        } else if (indentifyUser.senha !== password) {
            return res.send({ message: 'Senha incorreta' }).status(401)
        };

        userInfo.email = email
        userInfo.name = indentifyUser.nome

        res.status(200).send({ message: 'Usuário encontrado' })
    } catch (err) {
        return res.status(501).send({ message: 'Falha ao encontrar usuário' })
    }
})

app.post('/cadastro', async function (req, res) {
    try {
        const { name, email, password } = req.body
        const indentifyUser = await prisma.usuario.findFirst({ where: { email } })

        if (indentifyUser) {
            return res.send({ message: 'Possui cadastro' }).status(400)
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

        res.status(201).send({ message: 'Usuário criado' })
    } catch (err) {
        return res.status(501).send({ message: 'Falha ao cadastrar usuário' })
    }
})

app.post('/agendamento', async function (req, res) {
    try {
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
    } catch (err) {
        return res.status(501).send({ message: 'Não foi possível realizar o agendamento' })
    }
})

app.get('/horarios/:date', async function (req, res) {
    try {
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
    } catch (err) {
        return res.status(501).send({ message: 'Não foi possível consultar horários' })
    }
})

app.delete('/cancelar-agendamento/:id', async function (req, res) {
    try {
        const id = Number(req.params.id);
        await prisma.agendamento.delete({ where: { id } })

        return res.status(200).send({ messsageAlert: 'Agendamento Cancelado'})
    } catch (err) {
        return res.status(501).send({ message: 'Falha ao cancelar o agendamento' })
    }
})

app.get('/historico', async function (req, res) {
    try {
        const historicUser = await prisma.agendamento.findMany({
            where: {
                email: {
                    equals: userInfo.email
                }
            }
        })

        if (historicUser.length === 0) {
            return res.send({ message: 'Nenhum agendamento realizado' })
        }

        return res.status(200).send(historicUser)
    } catch (err) {
        return res.status(501).send({ message: 'Não foi possível consultar o histórico' })
    }
})

app.get('/message', function (req, res) {
    res.status(200).json(userInfo)
    userInfo.alertAnnimation = ''
})

app.listen(3001, () => console.log('servidor rodando'))