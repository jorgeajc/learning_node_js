const doWorkCallBack = () => {
    setTimeout(() => {
        callback('this ir my error', undefined)

        callback(undefined, [ 1, 4, 7 ])

    }, 2000)
}

doWorkCallBack((error, res) => {
    if( error ) {
        return console.log(error)
    }
    console.log( res )
})