import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price :String,
    description:String,
});

export default mongoose.models.product ||  mongoose.model("product",productSchema)

