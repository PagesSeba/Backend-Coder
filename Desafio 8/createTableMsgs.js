const  knex = require('knex');


class ClienteSQLITE {
    constructor(options) {
        this.knex = knex(options);
    }
    
    crearTabla() {
        return this.knex.schema.dropTableIfExists('mensajes')
            .finally(() => {
                return this.knex.schema.createTable('mensajes', table => {
                    table.increments('id').primary();
                    table.string('correo');
                    table.string('date');
                    table.string('message');
                })
            })
    }

    insertarMensajes(mensajes) {
        return this.knex('mensajes').insert(mensajes);
    }

    obtenerMensajes(){
        return this.knex('mensajes').select('*');
    }

    close() {
        this.knex.destroy();
    }
    
}

module.exports = ClienteSQLITE;