const fs = require('fs');
class Container{
    constructor(archivo){
        this.archivo = "messagesRecord";
    }
    async save (message) {
        try{
            const data = `Date: ${message.time}, UserName: ${message.username}, Message: ${message.message}\n`;
            await fs.promises.appendFile(`./${this.archivo}.txt`, data);
            console.log("Mensaje recibido")
        } catch(error) {
            console.log(`Error al guardar el mensaje: ${error}`)
        }
    }
    async getAll () {
        let allMessages = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        console.log("Mensajes: ", allMessages);
        return allMessages;
    }
    async deleteAll () {
        await fs.promises.writeFile(`./${this.archivo}.txt`, '{}');
        return "Borrado!"
    }
};

module.exports = Container;