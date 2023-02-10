//import mongoose
const mongoose=require('mongoose')

//tell the connection string
mongoose.connect('mongodb://localhost:27017/mymyntra',()=>{
    console.log('mongodb connected successfully');
})

//create model
const Customer=mongoose.model('Customer',{
    username:String,
    mobileNum:Number,
    password:String,
    address:String
})


const Product=mongoose.model('Product',{
    id: Number,
    brand:String,
    title:String,
    price: Number,
    image: String,
    pricetag:Number,
    category:String
  }
  )

  const Wishlist=mongoose.model('Wishlist',{
    id: Number,
    brand:String,
    title:String,
    price: Number,
    image: String,
    pricetag:Number,
    category:String
  }
  )

  const Brand=mongoose.model('Brand',{
    id: Number,
    brand:String,
    title:String,
    image: String,
    }
  )

module.exports={Customer,Product,Brand,Wishlist}