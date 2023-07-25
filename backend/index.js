const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dontenv = require("dotenv").config()
const Stripe = require('stripe')
const mercadopago = require("mercadopago");

const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json({ limit: "10mb" }));
app.use(express.static("../../client/html-js"));

const PORT = process.env.DB_HOST || 8080;

//mongodb connection
// console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connect to DataBase"))
.catch((err)=>console.log(err))

//Schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{
        type : String,
        unique: true
    },
    password: String,
    confirmPassword: String,
    image: String,
})

const productSchema = mongoose.Schema({
  name:String,
  category:String,
  image:String,
  price :Number,
  description:String,
});

// model
const productModel = mongoose.model("product",productSchema)
const userModel = mongoose.model("user",userSchema)
// const productModel = product(mongoose.model("user",productSchema))

//API

app.get("/",(req,res)=>{
    res.send("Server is running")
})
app.post("/signup", async (req, res) => {
    // console.log(req.body)
    const { email } = req.body;
    const data = await userModel.findOne({email : email})
  if(data){
    res.send({ message: "Email id is already register", alert: false });
  } else {
    const { firstName,lastName,email, password ,image} = req.body;
    const user = await userModel.create({
        firstName,
        lastName,
        email,
        password,
        image,
        });
    res.status(201).json({
        message: "Account Created successfully",alert: true,
        firstName,
      });
  }
})
//api login
app.post("/login", async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const data = await userModel.findOne({email : email,password : password})
    if (data) {
        const dataSend = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          image: data.image,
        };
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Check your Email and Password data and try login again",
        alert: false,
      });
    }
})

app.post("/UploadProduct", async (req, res) => {
  console.log(req.body);
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({
    message: "Upload successfully",
  });
})
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

//Payment getway MercadoPago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_KEY,
});

app.post("/create_preference",async(req, res) => {
  const {name,_id,image,description,category,price,qty,totalQty} = req.body
  try {
    let preference = {
      quantity:totalQty,
      items: 
        [
          {title: name,
            id:_id,
            picture_url:image,
            description: description,
            category_id: category,
          	unit_price: Number(price),
          	quantity: qty,}
        ],
      quantity:totalQty
      ,
      back_urls: {
        success: "http:127.0.0.1:5173/success",
        failure: "http:127.0.0.1:5173/cancel",
        pending: ""
      },
      auto_return: "approved",
      binary_mode: true,
    }
    
    const session = await mercadopago.preferences.create(preference)
    // const session = await stripe.checkout.sessions.create(params)
    res.status(200).json({id: session.body.id})
    console.log(session)
    
  } catch (err) {
    res.status(err.statusCode || 500).json(res.session)
    console.log(err.message)
  }
  console.log(req.body)
});
//Payment getway Stripe/*
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.post("/checkout-payment",async(req,res)=>{
  console.log(req.body)
  try {
    const params = {
      submit_type : 'pay',
      mode: "payment",
      payment_method_types : ['card'],
      billing_address_collection : "auto",
      shipping_options : [{shipping_rate : "shr_1NLdJ8JD6UJJlC7rnkxe26kB"}],

      line_items: req.body.map((item)=>{
        return{
          price_data : {
            currency : "usd",
            product_data : {
              name: item.name,
              // image : [item.image],
            },
            unit_amount : item.price * 100,
          },
          adjustable_quantity : {
            enabled: true,
            minimum : 1,
          },
          quantity : item.qty
        }
      }),

      success_url : `${process.env.FRONTEND_URL}/success`,
      cancel_url : `${process.env.FRONTEND_URL}/cancel`

    }
    const session = await stripe.checkout.sessions.create(params)
    res.status(200).json(session.id)
    
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message)
  }

})


app.listen(PORT, () => console.log("server is running at port : " + PORT));