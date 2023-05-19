const { response, request } = require("express");
const Product = require('../models/product');

const getAllProducts = async( req = request, res = response ) => {
    const products = await Product.find()

    res.status(200).json({
        products
    })

}

const getOneProduct = async(req = request, res = response) => {
    const { id } = req.params;

    try {
        const product = await Product.findById( id );

        res.json({
            product
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: error
        })
    }
}

const createProduct = async(req = request, res = response) => {
    const body = req.body;
    console.log(body)

    try {
        const productDB = await Product.findOne({ name: body.name })

        if( productDB ) {
            return res.status(400).json({
                msg: `Product ${ productDB.name }, of exist`
            })
        }

        //*** Generate data for save */
        const data = {...body }

        const product = new Product( data );

        //*** Save in DB */
        await product.save();

        res.status(201).json({
            product
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Talk with admin'
        })
    }
}

const updateProduct = async(req = request, res = response) =>  {
    const { id } = req.params;
    const { ...data } = req.body;

    try {
        
        const product = await Product.findByIdAndUpdate(id, data, { new: true })

        res.json({
            product
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: error
        })
    }
}

const deleteProduct = async(req = request, res = response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, {status: false}, { new: true });

        res.status(200).json({
            product
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: error
        })
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}