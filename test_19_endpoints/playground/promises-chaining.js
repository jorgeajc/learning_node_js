require('../connection/conn.js')
let user = require('../models/users.js')
let task = require('../models/task.js')

user.User.findByIdAndUpdate('609ee7d4741cca2214957520', {age: 2}).then((u)=> {
    console.log(u)
    return user.User.countDocuments({age:2})
}).then((res)=> {
    console.log(res)
}).catch((e) => {
    console.log(e)
})

task.Task.findByIdAndUpdate('609ec61203d29c24e44b700a', {description: 'editado'}).then((t)=> {
    console.log(t)
    return t.Task.countDocuments({description: 'editado'})
}).then((res)=> {
    console.log(res)
}).catch((e) => {
    console.log(e)
})


