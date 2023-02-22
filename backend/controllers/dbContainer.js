import knex from "knex";

export class Container {
    constructor(config, tableName) {
        this.knex = knex(config);
        this.tableName = tableName;
    }

    save(obj) {
        this.knex(this.tableName).insert(obj)
            .then(() => console.log('saved'))
            .catch(err => console.log(err))
    }

    async getAll() {
        try {
            let objs = await this.knex.from(this.tableName).select('*');
            return objs;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getById(id) {
        try {
            let obj = await this.knex.from(this.tableName).select().table(this.tablename).where('id', id).first();
            obj ? obj : {error: 'Objeto no encontrado'};
        } catch (error) {
            return {error: error};
        }
    }

    async deleteById(id) {
        try {
            await this.knex.from(this.tableName).where('id', '=', id).del();
            return {ok: 'obj deleted'};
        } catch (error) {
            return {error: error};
        }
    }

    async deleteAll() {
        try {
            await this.knex.from(this.tableName).del();
            return {ok: 'all deleted'};
        } catch (error) {
            return {error: error};
        }
    }

    async update(obj) {
        try {
            await this.knex.from(this.tableName).update(obj).update();
            return {ok: 'updated'};
        } catch (error) {
            return {error: error};
        }
    }
}