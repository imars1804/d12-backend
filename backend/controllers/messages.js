import normalizr from "normalizr";
import { Messages } from "./messagesContainer.js";

const controlMessages = new Messages();

export async function getMessagesNormalized() {
    try {
        const authorSchema = new normalizr.schema.Entity('authors');
        const messageSchema = new normalizr.schema.Entity('messages', {
          author: authorSchema,
        });
        const chat = new normalizr.schema.Entity('chat', {
          messages: [messageSchema],
        });
        const messages = await controlMessages.getAll();
        const data = {id: 'general', messages};
        const normalizedData = await normalizr.normalize(data, chat);
        return normalizedData;
    } catch (error) {
        console.log(error);
    }
}

export async function saveMessage({mail, nombre, apellido, edad, alias, avatar, text}) {
    const newMessage = {
        author: {id: mail, nombre, apellido, edad, alias, avatar, text}, text
    }
    console.log(newMessage);
    return await controlMessages.save(newMessage);
}