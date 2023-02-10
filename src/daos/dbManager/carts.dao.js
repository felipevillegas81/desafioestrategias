import { cartModel } from "../../models/cart.model.js"


class CartDao {
    async getAll() {
        return await cartModel.find()
    }
    async getById(id) {
        return await cartModel.findById(id)
    }
    async create(data) {
        return await cartModel.create(data)
    }
    async update(id, data) {
        return await cartModel.findByIdAndUpdate(id, data, { new: true })
    }
    async delete(id, data) {
        return await cartModel.findByIdAndDelete(id)
    }
}

export default new CartDao()