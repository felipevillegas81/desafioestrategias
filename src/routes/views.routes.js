import { Router } from 'express'
import productsDao from '../daos/dbManager/products.dao.js'
import cartsDao from '../daos/dbManager/carts.dao.js'

import productModel  from '../models/product.model.js'


const router = Router()
const isSession = (req, res, next) => {
    if (req.session.user){
        return res.redirect('profile')
    }
    next()
}

//router.get('/', (req, res) => {
//    res.redirect('/login')
//})



//Restore
router.get('/restore', isSession, (req, res) => {
    res.render('restore')
})

//Login
router.get('/login', isSession, (req, res) => {
    res.render('login')
})

router.get('/register', isSession, (req, res) => {
    res.render('register')
})

router.get('/profile',(req, res) => {
    if(!req.session.user){
        return res.redirect('/login')
    }
    res.render('profile', {user: req.session.user})
})

//Products
router.get('/', async (req, res) => {
    const { page } = req.query
    const { limit } = req.query
    const products = await productModel.paginate({}, { page: page || 1 , limit: limit || 2 });
//    const products = await productsDao.getAll()
console.log(products)

    const carts = await cartsDao.getAll()
    res.render('index', 
    { title: 'Home', 
    products,
    carts,
    user: req.session.user})
})

router.get('/edit/:id', async (req, res) => {
    const product = await productsDao.getById(req.params.id)
    res.render('edit', { title: 'Edit', product })
})

router.get('/viewProduct/:id', async (req, res) => {
    const product = await productsDao.getById(req.params.id)
    res.render('viewProduct', { title: 'viewProduct', product })
})

router.get('/delete/:id', async (req, res) => {
    const product = await productsDao.delete(req.params.id)
    const products = await productsDao.getAll()
    res.render('index', { title: 'Home', products })
})

router.get('/carts/:cid', async (req, res) => {
    const cart = await cartsDao.getById(req.params.id)
    res.render('view', { title: 'View', cart })
})

export default router