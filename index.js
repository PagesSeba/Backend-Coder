const fs = require('fs')

class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }
async getById(id){
        try {
            let data = await fs.promises.readFile(this.archivo, 'utf-8')
            let archivoParseado = JSON.parse(data)
            let encontrado = archivoParseado.find(object =>object.id === id)
            if (encontrado){
                return encontrado
            }else{
                return null
            }
        } catch(error) {
            console.log(`Hubo un error en getById ${error}`)
        }
    } 
    async getAll(){
        try {
            let data = await fs.promises.readFile(this.archivo, 'utf-8')
            return JSON.parse(data)
        } catch(error) {
            console.log(`Hubo un error en getAll ${error}`)
        }
    } 
}
const productos = new Contenedor ("productos.txt")


//---------------------------------------------------------------------*

const express = require('express')
const app = express()
const puerto = 8080

let productList = []

app.use((req,res,next)=>{
    productos.getAll().then((r)=>(productList = r))
    next()
})
app.get('/', (req, res) => {
    res.send('<h1 style="color: blue">Bienvenidos al server de Express</h1> <br> <button><a href= /productos> Listado de Productos </a> </button>  <button><a href= /productoRandom> Producto Random </a> </button>');
})

app.get('/productos', (req,res)=>{
    res.send(productList)
})

app.get('/productoRandom', (req,res)=>{
    const aleatorio =  Math.floor((Math.random() * (productList.length - 0 + 1)) + 0);
    res.send(productList[aleatorio])

})


app.listen(puerto,(error)=>{
    if (error){
        return console.log(`el servidor tiene un error ${error}`)
    }
    console.log(`el servidor se inicio en el puerto ${puerto}`)
})