const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")
const SwaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./gerenciamento-barbearia.json")

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000
app.use(express.json())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocument))

let userInfo = {
    email: null,
    name: '',
    alertAnnimation: ''
};

app.post('/login', async function (req, res) {
    const { email, password } = req.body
    const indentifyUser = await prisma.usuario.findFirst({ where: { email } })

    console.log(indentifyUser);
    console.log(req.body);

    return res.json({ message: 'Usuário não encontrado' })

    if (!indentifyUser) {
        return res.send({ message: 'Usuário não encontrado' })
    } else if (indentifyUser.senha !== password) {
        return res.send({ message: 'Senha incorreta' })
    };

    userInfo.email = email
    userInfo.name = indentifyUser.nome

    res.status(200).send({ message: 'Usuário encontrado' })
})

app.post('/cadastro', async function (req, res) {
    try {
        const { name, email, password } = req.body
        const indentifyUser = await prisma.usuario.findFirst({ where: { email } })

        console.log(indentifyUser);
        console.log(req.body);


        if (indentifyUser) {
            return res.send({ message: 'Possui cadastro' })
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
                data_agendada: new Date(date),
                horario: time,
                servico: service,
                tipo_servico: typeService,
                email: email,
            }
        })

        userInfo.alertAnnimation = 'Agendamento Realizado!'

        res.status(201).send({ message: 'Agendamento feito com sucesso' })
    } catch (err) {
        return res.status(501).send({ message: 'Não foi possível realizar o agendamento' })
    }
})

app.get('/horarios/:date', async function (req, res) {
    try {
        const dateInput = new Date(req.params.date);

        if (dateInput == 'Invalid Date') return res.send({ message: 'Data inválida' }).status(401)

        const searchTimes = await prisma.agendamento.findMany({
            where: {
                data_agendada: {
                    equals: dateInput
                }
            }
        })

        if (searchTimes.length === 0) {
            return res.send({ message: 'Todos horários disponíveis' })
        }

        return res.status(200).send(searchTimes)
    } catch (err) {
        return res.status(501).send({ message: 'Não foi possível consultar horários' })
    }
})

app.delete('/agendamento/:id', async function (req, res) {
    try {
        const id = Number(req.params.id);
        await prisma.agendamento.delete({ where: { id } })

        return res.status(200).send({ message: 'Agendamento Cancelado' })
    } catch (err) {
        return res.status(501).send({ message: 'Falha ao cancelar o agendamento' })
    }
})

app.get('/agendamento', async function (req, res) {
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



app.listen(PORT, () => console.log("Servidor iniciado"))