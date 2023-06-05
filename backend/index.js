const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dontenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

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
// model

const userModel = mongoose.model("user",userSchema)

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
    const data = await userModel.findOne({email : email})
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
        message: "Email is not available, please sign up",
        alert: false,
      });
    }


})

app.listen(PORT, () => console.log("server is running at port : " + PORT));