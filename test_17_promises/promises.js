const doWorkPromise = new Promise((resolve, reject)=> {
    setTimeout(() => {
        resolve([7, 4, 1])
        reject('this wrong')
    }, 2000)
})

doWorkPromise.then(( res )=>{
    console.log('Succes', res)
}).catch((e)=>{
    console.log('error', e)
})

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