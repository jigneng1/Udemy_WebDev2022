const express = require('express');
const  mongoose  = require('mongoose');
const app = express()
const path = require('path');
const { deflateSync } = require('zlib');
const Product = require('./model/product');
const methodOverride = require('method-override');

const categories = ['fruit','vegetable','dairy','mushroom']

//middleware

app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))
//connect mongdoDB
mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=>console.log("connected the mongoDB"))
.catch((e)=>console.log(e))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

app.get('/products',async(req,res)=>{
    const products = await Product.find({})
    res.render('products/index',{products})
})

app.get('/products/new',(req,res)=>{
    res.render('products/new')
})

app.get('/products/:id',async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/show',{product})
})

app.get('/products/:id/edit',async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.render('products/edit',{product , categories})
})

app.post('/products',async(req,res)=>{
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect('/products')
})

app.put('/products/:id',async(req,res)=>{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true})
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id',async(req,res)=>{
    const {id} = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3000,()=>{
    console.log(`listening in port 3000`);
})