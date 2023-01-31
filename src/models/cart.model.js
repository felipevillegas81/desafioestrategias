import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: { type: Array, required: false },
    quantity: { type: Number, required: false }
})

export const cartModel = model(cartCollection, cartSchema);