const square1 = function(x){
    return x*x
}
const square2 = (x) => {
    return x*x
}
const square3 = (x) => x*x 
console.log(square1(3))
console.log(square2(3))
console.log(square3(3))


const event = {
    name: 'Tasks',
    tastList: [{
        name: 'prueba 1',
        completed: false
    },{
        name: 'prueba 2',
        completed: true
    },{
        name: 'prueba 3',
        completed: false
    }],
    printTaskComplete() {
        return this.tastList.filter( (task) => task.completed === true )
    },
    printTaskIncomplete() {
        return this.tastList.filter( (task) => task.completed === false )
    }
}
console.log( event.printTaskComplete() ) 
console.log( event.printTaskIncomplete() )  