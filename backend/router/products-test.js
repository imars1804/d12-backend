import express from 'express';
import { getProductsTest } from "../controllers/products-test.js";
const routerProductsTest = express.Router();

routerProductsTest.get('/productos-test', getProductsTest);

export default routerProductsTest;