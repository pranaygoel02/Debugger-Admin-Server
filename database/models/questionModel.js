const mongoose = require('mongoose');
const  Round = require('../models/roundModel');

const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
    },
    code: {
        type: String,
    },
    answer: {
        type: String,
        required: true
    },
    options: [String],
    round: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Round
    },
},{timestamps: true})

module.exports = mongoose.model('Question', questionSchema)



