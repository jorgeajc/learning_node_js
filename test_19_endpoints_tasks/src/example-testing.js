const calculateTip = (total , tipPercent = .25)=> (total * tipPercent ) + total

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if( a < 0 || b < 0) return reject('Number invalid')

            resolve(a+b)
        }, 2000)
    })
}
module.exports = {
    calculateTip,
    add
}