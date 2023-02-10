import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'
import viewsRoutes from './routes/views.routes.js'
import mongoose from 'mongoose';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

import productModel from './models/product.model.js';

const app = express()
const port = 8080

// MongoDB local
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://felipevillegas81:Energia19B@coder.jqjafac.mongodb.net/ecommerce?retryWrites=true&w=majority', (error) => {
    if(error) {
    console.log('Error to connect MongoDB Atlas', error);
    } else {
    console.log('Connected to MongoDB Atlas');
    }
})

// Handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/', viewsRoutes);

app.listen(port, () => { console.log(`Server listening on port ${port}` )})