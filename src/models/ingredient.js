const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const MySchema = Schema(
    {
        name: {
            type: String
        },

        price: {
            type: Number
        },

        unit: {
            type: String,
            enum: ["1 kilo", "1 litro", "1 unidad"]
        },

    }, { timestamps: true }
)

module.exports = mongoose.model('Ingredients', MySchema)