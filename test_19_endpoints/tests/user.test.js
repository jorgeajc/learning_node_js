const request = require('supertest')
const app = require('../src/config-app.js')
const {User} = require('../models/users.js')
const { userOneId, userOne, setupDB } = require('./fixtures/db.js') 
 
beforeEach( setupDB )

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Jorge',
        email: 'alberto@gmail.com',
        password: '43214321'
    }).expect(201)
})
test('Should signup a new user and verify if exist', async () => {
    const res = await request(app).post('/users').send({
        name: 'Jorge',
        email: 'alberto@gmail.com',
        password: '43214321'
    }).expect(201)

    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()

    expect(res.body).toMatchObject({
        user: {
            name: 'Jorge',
            email: 'alberto@gmail.com'
        },
        token: res.body.token
    })
})
test('Should not signup a exiting user', async () => {
    await request(app).post('/users').send(userOne).expect(400)
})
test('Should login existing user', async () => {
    const res = await request(app).post('/user/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    expect(res.body.token).not.toBeNull()
})
test('Should not login', async () => {
    await request(app).post('/user/login').send({
        email: userOne.email,
        password: '123321123'
    }).expect(400)
})

test('Should view my profile', async () => {
     
    await request(app).get('/user/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200);
})
test('Should view my profile', async () => {
    await request(app).get('/user/me')
    .send().expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/user/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', `${__dirname}/fixtures/profile.jpg`)
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))  
})