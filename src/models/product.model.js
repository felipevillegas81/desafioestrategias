import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products';

const productSchema = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true, index: true },
    code: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true, index: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    thumbnails: { type: String, required: false }
})

productSchema.plugin(mongoosePaginate)

const productModel = model(productCollection, productSchema)

export default productModel