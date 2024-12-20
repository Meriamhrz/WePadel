// #region In memory Data
/*
const users = [
    { name: "mary", id: 1, age: 50 },
    { name: "lisa", id: 2, age: 20 },
    { name: "josh", id: 3, age: 30 },
];
const getUsers = (req, res) => {
    res.status(200).json({ users: users });
};
const getOneUser = (req, res) => {
    const id = req.params.id;
    const founUser = users.find((user) => user.id == id);
if (founUser) {
    res.status(200).json({ user: founUser });
} else {
    res.status(400).json({ msg: "no user found" });
}
};
const postUser = (req, res) => {
    console.log("add user");
};
const putUser = (req, res) => {
    console.log("put user");
};
const deleteUser = (req, res) => {
    console.log("delete user");
};
module.exports = { getUsers, postUser, putUser, deleteUser, getOneUser };
*/
// #endregion
const jwt = require("jsonwebtoken");
require('dotenv').config();

const Product = require("../models/Product");

// GET all products - allow public access
const getProducts = async (req, res) => {
    try {
        // Remove or modify token checking logic for public access
        const products = await Product.find();
        if (products.length > 0) {
            res.status(200).json({ products });
        } else {
            res.status(404).json({ msg: "No products found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


// GET a single product by ID
const getOneProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const foundProduct = await Product.findById(id);
        if (foundProduct) {
            res.status(200).json({ product: foundProduct });
        } else {
            res.status(404).json({ msg: "No product found with the given ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// POST a new product
const postProduct = async (req, res) => {
    const product = req.body;
    try {
        if (!product.brand || !product.paragraph || !product.price || !product.category || !product.rating || !product.image) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const foundProduct = await Product.findOne({ paragraph: product.paragraph });
        if (foundProduct) {
            return res.status(400).json({ msg: "Product already exists" });
        }

        const newProduct = new Product(product);
        await newProduct.save();
        res.status(201).json({ product: newProduct, msg: "Product successfully added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// PUT (update) a product by ID
const putProduct = async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (updatedProduct) {
            res.status(200).json({ product: updatedProduct, msg: "Update success" });
        } else {
            res.status(404).json({ msg: "No product found with the given ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// DELETE a product by ID
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct) {
            res.status(200).json({ msg: "Delete done", product: deletedProduct });
        } else {
            res.status(404).json({ msg: "No product found with the given ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

module.exports = { getProducts, getOneProduct, postProduct, putProduct, deleteProduct };
