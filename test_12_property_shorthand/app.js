const product = {
    label: 'My pc',
    price: 500,
    stock: 1,
    salePrice: undefined
}

const transaction = (type, {label, stock}) => {
    console.log(type + ' ' + label + ' ' + stock)
}

transaction('sale', product)