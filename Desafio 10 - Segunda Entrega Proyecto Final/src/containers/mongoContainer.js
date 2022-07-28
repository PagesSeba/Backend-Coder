import config from '../config.js'
import mongoose from 'mongoose'

await mongoose.connect(config.mongodb.connectionString)

class MongoContainer {
    constructor(collectionName, schema){
        this.name = collectionName
        this.collection = mongoose.model(collectionName, schema)
    }

    // Realizar CRUD (Create, Read, Update, Delete)

    create = async (req, res) => {
        try {
            let itemInModel;
            if(this.name === "carritos"){
                itemInModel = new (this.collection)({ timestamp: new Date().toString(), products: [] })
            }else{
                itemInModel = new (this.collection)({ timestamp: new Date().toString(), ...req.body })
            }
            await itemInModel.save()
            res.json("Creado Correctamente!")
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async (req, res) => {
        try {
            const itemsCollection = await this.collection.find()
            const items = itemsCollection.map( item => ({
                id: item._doc._id.toString(),
                ...item._doc
            }))
            res.json(items)
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (req, res) => {
        try {
            const item = await this.collection.find({ _id: { $eq: req.params.id} })
            res.json(item)
        } catch (error) {
            console.log(error)
        }
    }

    update = async (req, res) => {
        try {
            await this.collection.updateOne({_id: req.params.id}, {$set: { ...req.body } })
            res.json("Actualizado con éxito!")
        } catch (error) {
            console.log(error)
        }
    }

    delete = async (req, res) => {
        try {
            await this.collection.deleteOne({_id: req.params.id})
            res.json("Borrado con éxito!")
        } catch (error) {
            console.log(error)
        }
    }

}

export default MongoContainer;
