const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.get('/agendamento', function (req, res) {
    res.status(200)
})

app.post('/agendamento', async function (req, res) {
    const infosSchediling = req.body

    await prisma.agendamento.create({
        data: {
            data_agendada: infosSchediling.date,
            horario: infosSchediling.time,
            servico: infosSchediling.service,
            tipo_servico: infosSchediling.type_service,
            email: 'egafas@gmail.com',
            
        }
    })

    res.status(201)
})

app.listen(3001, () => console.log('servidor rodando'))