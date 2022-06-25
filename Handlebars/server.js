//import express from 'express'
const express = require('express')
const app = express()

const handlebars = require("express-handlebars")

const Productos = require('./clases/productos.js')

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})
server.on('error', error => console.log(`Error en el servidor ${error}`))

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))


app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

/*----*/

let products = [
    {id:1, name: 'Adobe Illustrador', price: 1000, thumbnail:'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_adobe_illustrator-64.png'},
    {id:2, name: 'Adobe Photoshop', price: 2000, thumbnail:'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_adobe_photoshop-64.png'},
    {id:3, name: 'Adobe Indesign', price: 800, thumbnail:'https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_indesign_adobe-64.png'}
]

const productos = new Productos(products)

let productList = () => products.length > 0 ? products : false

app.get('/', (req,res)=>{
    res.render('main', {productList: productList()})
})

app.get('/ingresar', (req,res)=>{
    res.render('formulario')
})

app.post('/ingresar', (req, res)=>{
    req.body.name.length > 0 && req.body.price.length > 0 && req.body.thumbnail.length > 0 ?
    (productos.add(req.body), res.redirect('/')) :
    res.render('formulario', {msg: 'Debe completar todos los campos'})
})