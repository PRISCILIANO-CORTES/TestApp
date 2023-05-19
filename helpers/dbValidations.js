const Product = require('../models/product');

const existProductId = async(id) => {
    //*** Verify if product exist */
    const productExist = await Product.findById(id);
    if (!productExist) {
        throw new Error(`This id ${id} not exist`);
    }
}

module.exports = {
    existProductId,
}