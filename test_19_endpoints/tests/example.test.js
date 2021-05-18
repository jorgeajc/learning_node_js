const {calculateTip, add} = require('../src/example-testing.js')

test('math', () => {
    const tt = calculateTip(10, .3)
    expect(tt).toBe(13)
})
test('math2', () => {
    const tt = calculateTip(10)
    expect(tt).toBe(12.5)
})
test('math3', (done) => {
    const a = 2, b = 5
    add(a, b).then((sum)=>{
        expect(sum).toBe(a+b)
        done()
    })
})
test('math4', async () => {
    const a = 2, b = 5
    const tt = await add(a,b)
    expect(tt).toBe(a+b)
})