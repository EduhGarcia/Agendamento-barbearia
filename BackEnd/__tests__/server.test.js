const request = require("supertest")
const app = require("../src/repositories/inMemoryBarber")

describe('Testing access user', () => {
    it('Login user', async () => {
        const res = await request(app).post('/login').send({
            email: 'useracess@gmail.com', 
            password: 'access123'
        })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
    })

    it('Signin user', async () => {
        let codeVerify;

        const res = await request(app).post('/cadastro').send({
            name: 'usuario',
            email: 'newuser@gmail.com', 
            password: 'password1'
        })

        if (res.statusCode == 200 || res.statusCode == 201) {
            codeVerify = res.statusCode
        }

        expect(res.statusCode).toEqual(codeVerify)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Testing scheduling user', () => {
    it('Create scheduling', async () => {
        let codeVerify;
        
        const res = await request(app).post('/agendamento').send({
            date: new Date('2024-01-30'), 
            time: '10:30', 
            service: 'Barba', 
            typeService: 'Barba tradicional',
            email: 'useracess@gmail.com'
        })

        if (res.statusCode == 200 || res.statusCode == 201) {
            codeVerify = res.statusCode
        }

        console.log(res.body);
        expect(res.statusCode).toEqual(codeVerify)
        expect(res.body).toHaveProperty('message')
    })

    it('Search times availables', async () => {
        const res = await request(app).get('/horarios/2024-02-15')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeDefined()
    })

    it('Delete scheduling', async () => {
        const res = await request(app).delete('/agendamento/2')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeDefined()
    })

    it('get schedules user', async () => {
        const res = await request(app).get('/agendamento')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeDefined()
    })
})

describe('Testing message', () => {
    it('Testing information user', async () => {
        const res = await request(app).get('/message')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toBeDefined()
    })
})