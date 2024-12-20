const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("order", orderSchema);
