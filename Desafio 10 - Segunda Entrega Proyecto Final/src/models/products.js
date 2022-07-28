import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    precio: { type: Number, required: true },
    foto: { type: String, required: true },
    stock: { type: Number, required: true },
    timestamp: { type: String, required: true }
})

const productModel = mongoose.model('producto', productSchema)

export default productModel