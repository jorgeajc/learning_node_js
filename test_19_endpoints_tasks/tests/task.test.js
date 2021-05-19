const request = require('supertest')
const app = require('../src/config-app.js')
const {Task} = require('../models/task.js')
const { userOne, setupDB } = require('./fixtures/db.js') 
 
beforeEach( setupDB )

test('Should create task for user', async () => {
    const res = await request(app).post('/task')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'Testing des',
        completed: true
    }).expect(201)
    const task = Task.findById(res.body._id)
    expect(task).not.toBeNull()
})

test('Should create task for user', async () => {
    await request(app).get('/task')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)
})