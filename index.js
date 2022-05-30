const fs = require("fs");

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async save (product) {
        try{
            let listaProductos = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
            let idProducto = 0;
            listaProductos.forEach(elemento => {
                if(elemento.id > idProducto){
                    idProducto = elemento.id
                }
            });
            product.id = idProducto + 1;
            listaProductos.push(product);
            await fs.promises.writeFile(`./${this.archivo}.txt`, JSON.stringify(listaProductos));
        } catch(error) {
            product.id = 1;
            let listaProductos = [product];
            await fs.promises.writeFile(`./${this.archivo}.txt`, JSON.stringify(listaProductos));
        }
    }

    async getById(id) {
        try {
            const data = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, "utf-8"));
            const objeto = data.find(objeto => objeto.id === id);
            return (objeto ? console.log(objeto) : console.log("No se encontro el producto con el id ", id));
        } catch (error) {
            console.log("Error buscando producto por id: ", error);
        }
    }

    async getAll() {
        try {
            const data = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, "utf-8"));
            return (data ? console.log(data) : "El archivo está vacío");
        } catch (error) {
            console.log("Error buscando productos: ", error)
        }
    }

    async deleteById(id) {
        try {
            const data = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, "utf-8"));
            const arrayDelxID = data.filter(objeto => objeto.id !== id);
            await fs.promises.writeFile(`./${this.archivo}.txt`, JSON.stringify(arrayDelxID))
            console.log(`Producto con id ${id} borrado`)
        } catch (error) {
            console.log("Error eliminando objeto por id: ", error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.archivo}.txt`, "")
            console.log("Todos los productos fueron eliminados exitosamente")
        } catch (error) {
            console.log("Error eliminando objetos: ", error)
        }
    }
}


const productos = [{
    title: "Camiseta Belgrano",
    price: 9000,
    thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/672/177/products/celeste1-85db98b8d9c6eba4cd16455527422469-640-0.png"
}, {
    title: "Camiseta Talleres",
    price: 8750,
    thumbnail: "https://todosobrecamisetas.com/wp-content/uploads/camisetas-givova-talleres-2022-4.jpg"
}, {
    title: "Camiseta Instituto",
    price: 7560,
    thumbnail: "https://newsport.vteximg.com.br/arquivos/ids/3575839-1000-1000/2001-a.jpg?v=637503979277900000"
}]

const archivo = new Contenedor("productos")

//  archivo.save(productos[2]); 
//  archivo.getById(1); 
//  archivo.getAll(); 
// archivo.deleteById(1); 
// archivo.deleteAll(); 