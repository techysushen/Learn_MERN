import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name : { type : String, required : true },
    rating : { type : Number, required : true },
    Comment : { type : String, required : true },
}, { timestamps : true })
const productSchema = mongoose.Schema({
    name : { type : String, required : true },
    user : { type : mongoose.Schema.Types.ObjectId, required : true, ref : "User" },
    image : { type : String, required : true },
    brand : { type : String, required : true },
    category : { type : String, required : true },
    description : { type : String, required : true },
    rating : { type : Number, required : true , default : 0},
    numReviews : { type : Number, required : true , default : 0},
    price : { type : Number, required : true , default : 0},
    countInStock : { type : Number, required : true , default : 0},
    reviews : [reviewSchema]

}, { timestamps : true });

const Product = mongoose.model('Product', productSchema);
export default Product;