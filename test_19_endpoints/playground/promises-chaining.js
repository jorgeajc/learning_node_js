require('../connection/conn.js')
let user = require('../models/users.js')
let task = require('../models/task.js')

const updateAgeAndCount = () => {
    user.User.findByIdAndUpdate('609ee7d4741cca2214957520', {age: 2}).then((u)=> {
        console.log(u)
        return user.User.countDocuments({age:2})
    }).then((res)=> {
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
}
const updateDescriptionAndCount = () => {
    task.Task.findByIdAndUpdate('609ec61203d29c24e44b700a', {description: 'editado'}).then((t)=> {
        console.log(t)
        return task.Task.countDocuments({description: 'editado'})
    }).then((res)=> {
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
}

const updateAgeAndCountParam = async (id, age) => {
    const myUser = await user.User.findByIdAndUpdate(id, {age})
    const count = await user.User.countDocuments({age})
    return count
}
const callUpdateAgeAndCount = () => {
    updateAgeAndCountParam('609ee7d4741cca2214957520', 20).then((res)=> {
        console.log(res)
    }).catch((e)=>{
        console.log(e)
    })
}


const deleteTaskAndCount = async (id) => {
    await task.Task.findOneAndDelete( id )
    const count = await user.User.countDocuments( id )
    return count
}
const callDeleteTaskAndCount = () => {
    deleteTaskAndCount('609ec61203d29c24e44b700a').then((res)=> {
        console.log(res)
    }).catch((e)=>{
        console.log(e)
    })
}