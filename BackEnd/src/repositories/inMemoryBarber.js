const express = require("express")
const app = express()

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin');

    next();
});

let userInfo = {
    email: null,
    name: '',
    alertAnnimation: ''
};

const dbScheduling = [{
    id: 1,
    date: '2024-02-30',
    time: '10:30',
    service: 'Cabelo',
    typeService: 'Corte Militar',
    email: 'useracess1@gmail.com'
}, {
    id: 2,
    date: '2024-02-15',
    time: '08:30',
    service: 'Barba',
    typeService: 'Barba tradicional',
    email: 'useracess2@gmail.com'
}, {
    id: 3,
    date: '2024-02-15',
    time: '9:00',
    service: 'Cabelo',
    typeService: 'Corte Social',
    email: 'useracess3@gmail.com'
}, {
    id: 4,
    date: '2024-03-28',
    time: '04:30',
    service: 'Cabelo',
    typeService: 'Corte militar',
    email: 'useracess1@gmail.com'
}]

app.post('/login', async function (req, res) {
    try {
        let indentifyUser = [{
            email: 'useracess@gmail.com',
            password: 'pass123',
            name: 'user'
        }]

        const { email, password } = req.body

        const findUser = indentifyUser.find(item => item === email)

        if (!findUser) {
            return res.send({ message: 'Usuário não encontrado' })
        } else if (indentifyUser[0].password !== password) {
            return res.send({ message: 'Senha incorreta' })
        };

        userInfo.email = email
        userInfo.name = indentifyUser.name

        res.status(200).send({ message: 'Usuário encontrado' })
    } catch {
        return res.status(501).send({ message: 'Falha ao encontrar usuário' })
    }
})

app.post('/cadastro', async function (req, res) {
    try {
        const { name, email, password } = req.body
        let newUser = []

        userInfo.email = email
        userInfo.name = name

        newUser.push(...newUser, {
            name,
            email,
            password
        })

        userInfo.alertAnnimation = "Cadastrado com sucesso!"

        res.status(201).send({ message: 'Usuário criado' })
    } catch (err) {
        return res.status(501).send({ message: 'Falha ao cadastrar usuário' })
    }
})

app.post('/agendamento', async function (req, res) {
    try {
        const { date, time, service, typeService, email } = req.body

        let createScheduling = []

        createScheduling.push(...createScheduling, {
            date,
            time,
            service,
            typeService,
            email
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

        const searchTimes = dbScheduling.filter(item => item.date === req.params.date)

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
        const searchId = dbScheduling.find(item => item.id == id)

        if (searchId === undefined) throw true

        return res.status(200).send({ message: 'Agendamento Cancelado' })
    } catch (err) {
        return res.status(501).send({ message: 'Falha ao cancelar o agendamento' })
    }
})

app.get('/agendamento', async function (req, res) {
    try {
        const historicUser = dbScheduling.filter(item => item.email == 'useracess1@gmail.com')

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

module.exports = app