import React, { useState } from "react";
import ProductItem from "./ProductItem";
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const Products = () => {
    const [products, setProducts] = useState();
    socket.on('products', products => {
      setProducts(products);
    })
    return <div className="products">
    <h2>Productos</h2>
    {
      products?.length > 0 ? products.map(item => {return <ProductItem key={`item-${item.id}`} item={item} />}) : <h2>no hay productos</h2>
    }
    </div>
}

export default Products;