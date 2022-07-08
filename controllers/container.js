const fs = require('fs');
const productos = require('../data/products.json');
class Container {
    constructor(archivo) {
        this.archivo = archivo;
        this.objects = this.readData();
    }
    
    generateId() {
        try {
            if (this.objects.length === 0) return 1;
            return this.objects[this.objects.length - 1].id + 1;
        } catch (err) {
            console.log(err);
        }
    }
   
    async save(obj) {
        try {
            obj.id = await this.generateId();
            obj.timestamp = new Date().toLocaleString("fr-FR");
            obj.products = new Array;
            this.objects.push(obj);
            this.writeData();
            return obj.id;
        } catch (err) {
            console.log(err);
        }
    }
    
    getById(id) {
        try {
            const obj = this.objects.find(el => el.id === id);
            return obj ? obj : null;
        } catch (err) {
            console.log(err);
        }
    }
   
    getAll() {
        try {
            return this.objects;
        } catch {
            return [];
        }
    }
    
    deleteById(id) {
        try {
            let indexObj = this.objects.findIndex(obj => obj.id === id);
            if (indexObj === -1) return indexObj;
            this.objects.splice(indexObj, 1);
            this.writeData();
        } catch (err) {
            console.log(err);
        }
    }
    
    async deleteAll() {
        try {
            this.objects = [];
            this.writeData();
        } catch (err) {
            console.log(err);
        }
    }
    update(id, data) {
        const objToUpdate = this.getById(id);
        const indexObj = this.objects.findIndex(obj => obj.id === objToUpdate.id);
        this.objects[indexObj] = { ...this.objects[indexObj], ...data };
        this.writeData();
    }
    readData() {
        try {
            return JSON.parse(fs.readFileSync(this.archivo, 'utf-8'));
        } catch (error) {
            console.log(error);
            if (error.message.includes('no such file or directory')) return [];
        }
    }
    async writeData() {
        await fs.promises.writeFile(this.archivo, JSON.stringify(this.objects, null, 2));
    }
    saveProduct(idCartSelected, idProduct) {
        try {
            const cartSelected = this.getById(idCartSelected);
            if (cartSelected == null) return;
            const productSelected = productos.filter(product => product.id === idProduct);
            if (productSelected == null) return;
            cartSelected.products.push(productSelected);
            this.writeData();
            return 'Producto agregado con éxito';
        } catch (err) {
            console.log(err);
        }
    }
    deleteProduct(idCartSelected, idProduct) {
        try {
            const cartSelected = this.getById(idCartSelected);
            if (cartSelected == null) return;
            const productToDelete = cartSelected.products.findIndex(product => product.id === idProduct);
            if (productToDelete == -1) return;
            cartSelected.products.splice(productToDelete, 1);
            this.writeData();
            return 'Producto eliminado!';
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Container