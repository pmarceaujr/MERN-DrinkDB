const { Schema, model } = require('mongoose');

const drinkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  glass: {
    type: String,
    required: true,
  },
  ingredients: [
    String
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: "Ingredient"
    // },
  ],
  instructions: {
    type: String,
  },
  // saved book id from GoogleBooks
  // drinkId: {
  //   type: String,
  //   required: true,
  // },
  image: {
    type: String,
  },
  measure: {
    type: [String],
  },
});

const Drink = model('Drink', drinkSchema)

module.exports = Drink;
