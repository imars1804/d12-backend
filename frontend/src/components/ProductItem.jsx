import React from "react";

const ProductItem = ({item}) => {
    return <div className="product">
    <h4>{item.name}</h4>
    <p>{item.price}$</p>
    <img src={item.thumbnail} alt={item.name} />
    </div>
}

export default ProductItem;