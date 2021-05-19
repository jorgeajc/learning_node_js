const doWorkPromise = new Promise((resolve, reject)=> {
    setTimeout(() => {
        resolve([7, 4, 1])
        reject('this wrong')
    }, 2000)
})

/* doWorkPromise.then(( res )=>{
    console.log('Succes', res)
}).catch((e)=>{
    console.log('error', e)
}) */


const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

/* add(1, 2).then( (sum) =>{
   console.log(sum) 
   add(sum, 2).then( (sum2) =>{
        console.log(sum2) 
    }).catch( (e) => {
        console.log(e)
    })
}).catch( (e) => {
    console.log(e)
})

add(1, 2).then( (sum) =>{
    console.log(sum) 
    return add(sum, 4)
}).then( (sum2) =>{
    console.log(sum2) 
}) .catch( (e) => {
     console.log(e)
 }) */


module.exports = add
// 
// 
//                               _ fulfilled  
//                              /
// Promise  ---> Pending   --->
//                              \_ rejected    
// 
// 
// 
// 
// 
// 