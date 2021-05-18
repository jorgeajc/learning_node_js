const request = require('supertest')
const app = require('../src/config-app.js')
const {User} = require('../models/users.js')

const userOne = {
    name: 'Jorge',
    email: 'jorge@gmail.com',
    password: '12341234'
}
beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Jorge',
        email: 'alberto@gmail.com',
        password: '43214321'
    }).expect(201)
})
test('Should not signup a exiting user', async () => {
    await request(app).post('/users').send(userOne).expect(400)
})
test('Should login existing user', async () => {
    await request(app).post('/user/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})
test('Should not login', async () => {
    await request(app).post('/user/login').send({
        email: userOne.email,
        password: '123321123'
    }).expect(400)
})

test('Should view my profile', async () => {
    var res = await request(app)
        .post('/user/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }); 
    await request(app).get('/user/me')
        .set('Authorization', 'Bearer ' + res.body.token)
        .expect(200);
})
test('Should view my profile', async () => {
    await request(app).get('/user/me')
    .send().expect(401)
})