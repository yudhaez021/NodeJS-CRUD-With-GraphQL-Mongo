const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    shortDescription: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model('Category', categorySchema);
