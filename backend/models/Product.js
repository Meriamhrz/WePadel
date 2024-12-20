var mongoose = require("mongoose");
const Schema = mongoose.Schema;
    
const productSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    paragraph: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

},
);
module.exports=mongoose.model('product',productSchema)