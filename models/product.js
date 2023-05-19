const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...product } = this.toObject();
    return product
}

module.exports = model('Product', ProductSchema)