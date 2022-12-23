const mongoose = require('mongoose');
const Product = require('./model/product');
mongoose
//connect mongdoDB
mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=>console.log("connected the mongoDB"))
.catch((e)=>console.log(e))

const p = new Product({
    name:'Ruby Grapefruit',
    price : 1.99,
    category:'fruit'
})
p.save().then(p =>{
    console.log(p)
})
.catch(e =>{
    console.log(e)
})