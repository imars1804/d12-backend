import {model} from 'mongoose';

export class ContainerMongo {
    constructor(collection, schema) {
        this.model = model(collection, schema);
    }
    save(obj) {
        try {
            return this.model.create(obj);
        } catch (error) {
            console.log(error);
        }
    }
    getAll() {
        try {
            return this.model.find();
        } catch (error) {
            console.log(error);
        }
    }
}