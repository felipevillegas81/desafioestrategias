import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { userModel } from './models/user.model.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'
import viewsRoutes from './routes/views.routes.js'
import sessionRoutes from './routes/session.routes.js'
import mongoose from 'mongoose';
import Handlebars from 'handlebars';
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport.config.js';
import passport from 'passport';

import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'

import productModel from './models/product.model.js';

const app = express()
const port = 8080

//Session
app.use(cookieParser())
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://felipevillegas81:Energia19B@coder.jqjafac.mongodb.net/ecommerce?retryWrites=true&w=majority',
            mongoOptions: {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            },
            ttl: 60
        }),
        collectionName: 'login',
        secret: 's3c73t',
        resave: false,
        saveUninitialized: false,
    })
)

// MongoDB Atlas
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://felipevillegas81:Energia19B@coder.jqjafac.mongodb.net/ecommerce?retryWrites=true&w=majority', (error) => {
    if(error) {
    console.log('Error to connect MongoDB Atlas', error);
    } else {
    console.log('Connected to MongoDB Atlas');
    }
})

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes
app.use('/', viewsRoutes);
app.use('/api/sessions', sessionRoutes)
app.use('/session', sessionRoutes)
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.get('*', (req,res) => {res.status(404).send('404 not found')})

app.listen(port, () => { console.log(`Server listening on port ${port}` )})