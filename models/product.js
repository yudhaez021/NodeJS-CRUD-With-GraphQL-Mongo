const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productCode: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productImageUrl: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    shortProductDescription: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    },
    promoDescription: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model('Product', productSchema);
