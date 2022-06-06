
const Product1 = require("../models/product.model");

const getAllProduct = async (req,res,next) => {
    try {
        const products = await Product1.find().lean().exec();

        return res.status(200).json({
            products : products,
        })
    }
    catch(error) {

        return res.status(500).json({
            message : error.message
        })

    }
}


const addProduct = async (req,res,next) => {
    try {
        const product = await Product1.create(req.body);

        return res.status(201).json({
            product : product
        })
    }
    catch(error) {

        return res.status(500).json({
            message : error.message
        })

    }
}

module.exports = {
    getAllProduct,
    addProduct
}