import { Router } from "express"
import cartsDao from "../daos/dbManager/carts.dao.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const carts = await cartsDao.getAll()
        res.json(carts)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.get("/:id", async (req, res) => {
    try {
        const cart = await cartsDao.getById(req.params.id)
        res.json(cart)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.post("/", async (req, res) => {
    try {
        //Agregar Validación de Campos
        const cart = await cartsDao.create(req.body)
        //res.json(product)
        res.redirect('/?message=cart created successfully')
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.put("/:id", async (req, res) => {
    try {
        //Agregar Validación de Campos
        const cart = await cartsDao.update(req.params.id, req.body)
        res.json(cart)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const cart = await cartsDao.delete(req.params.id)
        res.redirect('/?message=cart deleted successfully')
        res.json(cart)
    } catch (error) {
        res.status(500).json( {error: error.message} )
    }
})

export default router