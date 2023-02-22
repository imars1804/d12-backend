import {faker} from '@faker-js/faker';

export function getProductsTest(req, res) {
    let products = [];
    for(let i = 0; i < 5; i++) {
        const newProd = {
            id: i,
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.abstract()
        }
        products.push(newProd);
    }
    res.json(products);
}