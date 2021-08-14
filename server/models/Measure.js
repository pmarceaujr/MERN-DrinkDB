const { Schema, model } = require('mongoose');

const measureSchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
})

const Measure = model('Measure', measureSchema)

module.exports = Measure;