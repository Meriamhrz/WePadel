const Order = require("../models/Order");

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("products.productId", "name price");
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error fetching orders" });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id).populate("products.productId", "name price");
        if (order) {
            res.status(200).json({ order });
        } else {
            res.status(404).json({ msg: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error fetching order" });
    }
};

module.exports = { getOrders, getOrderById };
