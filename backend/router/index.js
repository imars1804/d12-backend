import express from 'express';
import routerProductsTest from './products-test.js';

const router = express.Router();

router.use('/', routerProductsTest);

export default router;