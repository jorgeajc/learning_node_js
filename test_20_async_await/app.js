const promises = require('../test_17_promises/promises.js')

const doWork = async () => {
    const sum = await promises(1, 2)
    return sum
}

doWork().then((res)=>{
    console.log(res)
}).catch((e)=>{
    console.log(e)
})