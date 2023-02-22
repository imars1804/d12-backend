import { ContainerMongo } from "./mongoContainer.js";
import { Schema } from "mongoose";

export class Messages extends ContainerMongo {
    constructor() {
        super('messages', new Schema({
            author: {
                id: {type: String, require: true}, 
                nombre: {type: String, require: true}, 
                apellido: {type: String, require: true}, 
                edad: {type: Number, require: true}, 
                alias: {type: String, require: true},
                avatar: {type: String, require: true}
            },
            text: {type: String, require: true}            
        }, {timestamps: true}))
    }
}