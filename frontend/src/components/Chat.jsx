import {React, useState} from "react";
import io from 'socket.io-client';
import MessageItem from "./MessageItem";
import {schema, denormalize} from 'normalizr';

const socket = io('http://localhost:8080');

const Chat = () => {
    const [messages, setMessages] = useState();
    const [reductPercent, setReductPercent] = useState();
    const [text, setText] = useState('');
    const [formValues, setFormValues] = useState({
        mail: '',
        nombre: '',
        apellido: '',
        edad: 18,
        alias: '',
        avatar: ''
    })
    const handleInputChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name] : event.target.value
        })
    }
    const handleInputChangeText = (event) => {
        setText(event.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(formValues.mail === '' || formValues.alias === '' || text === '') {
            return alert('debe completar todos los campos para enviar un mensaje');
        }
        try {
            let mess = formValues;
            mess.text = text;
            await socket.emit('newMessage', mess);
            setText('');
        } catch (e) {
            alert(e);
        }
    }
    socket.on('messages', async normalizedMessages => {
        const authorSchema = new schema.Entity('authors');
        const messageSchema = new schema.Entity('messages', {
          author: authorSchema,
        });
        const chat = new schema.Entity('chat', {
          messages: [messageSchema],
        });
        const dataDenormalized = await denormalize(
            normalizedMessages.result,
            chat,
            normalizedMessages.entities
        );
        const reductionPercentage = Math.floor(
            100 - (JSON.stringify(normalizedMessages).length * 100) / JSON.stringify(dataDenormalized).length
        );
        setReductPercent(reductionPercentage);
        setMessages(dataDenormalized.messages);
        console.log(dataDenormalized.messages);
    })

    return <div className="chat-container">
        <h2>Centro de mensajes</h2>
        <h3>Compresion: {`${reductPercent}%`}</h3>
        <form onSubmit={handleSubmit}>
            <input type="mail" placeholder="ingrese su mail" name="mail" onChange={handleInputChange} value={formValues.mail} />
            <input type="text" placeholder="ingrese su Nombre" name="nombre" onChange={handleInputChange} value={formValues.nombre} />
            <input type="text" placeholder="ingrese su Apellido" name="apellido" onChange={handleInputChange} value={formValues.apellido} />
            <input type="number" placeholder="ingrese su edad" name="edad" onChange={handleInputChange} value={formValues.edad} />
            <input type="text" placeholder="ingrese su Alias" name="alias" onChange={handleInputChange} value={formValues.alias} />
            <input type="text" placeholder="ingrese su Avatar(URL)" name="avatar" onChange={handleInputChange} value={formValues.avatar} />
            <div className="mensajes">
                {
                    messages ? messages.map(mess => <MessageItem item={mess._doc} />) : null
                }
            </div>
            <input type="text" placeholder="ingrese su mensaje" name="text" onChange={handleInputChangeText} value={text} />
            <input type="submit" value='enviar' />
        </form>
    </div>
}

export default Chat;