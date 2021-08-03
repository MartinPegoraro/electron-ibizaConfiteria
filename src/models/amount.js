const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const MySchema = Schema({
    amount: {
        type: Number
    },

    ingredients: {
        type: ObjectId,
        ref: "Ingredients"
    }


}, { timestamps: true });

module.exports = mongoose.model('Amounts', MySchema)