import MongoContainer from "../../containers/mongoContainer.js"

class ProductDaoMongo extends MongoContainer {
    constructor() {
        super("productos", {
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            codigo: { type: String, required: true },
            precio: { type: Number, required: true },
            foto: { type: String, required: true },
            stock: { type: Number, required: true },
            timestamp: { type: String, required: true }
        })
    }
}

export default ProductDaoMongo