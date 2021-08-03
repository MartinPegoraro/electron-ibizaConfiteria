const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const MySchema = Schema({
    name: {
        type: String
    },

    ingredients: [{
        type: ObjectId,
        ref: "Ingredients"
    }],

    price: {
        type: Number
    },

    cantXIngredient: [{
        type: ObjectId,
        ref: "Amounts"
    }]

}, { timestamps: true });

module.exports = mongoose.model('Products', MySchema)
