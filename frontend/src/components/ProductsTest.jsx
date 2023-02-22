import {React, useState, useEffect } from "react";
import axios from 'axios';
import ProductItem from "./ProductItem";

const ProductsTest = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/productos-test')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                alert(err);
            })
    }, []);
    return <>
        <h2>Faker</h2>
        {
            products.map(item => <ProductItem item={item} />)
        }
    </>
}

export default ProductsTest;