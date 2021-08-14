const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    measure: {
        type: String,
        // required: true,
    }
})

const Ingredient = model('Ingredient', ingredientSchema)

module.exports = Ingredient