import React from "react";
import { useState } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const FormProd = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        thumbnail: ''
    })

    const handleInputChange = (event) => {
        console.log(formValues)
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const post = formValues;
        try {
            setFormValues({
                name: '',
                price: '',
                thumbnail: ''
            })
        socket.emit('newProduct', post);
        } catch (e) {
          alert(e)
        }
    }

    return <div className="form-container">
        <h2>Ingrese su producto</h2>
        <form onSubmit={handleSubmit}>
            <input className="form-field" type="text" placeholder="Nombre del producto" name="name" onChange={handleInputChange} value={formValues.name} />
            <input className="form-field" type="number" placeholder="Precio del producto" name="price" onChange={handleInputChange} value={formValues.price} />
            <input className="form-field" type="text" placeholder="Link a la imagen del producto" name="thumbnail" onChange={handleInputChange} value={formValues.thumbnail} />
            <input type="submit" value="Enviar" />
        </form>
    </div>
}

export default FormProd;