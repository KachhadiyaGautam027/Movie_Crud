const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName: String,
    action: String,
    description: String,
    price: Number,
    movieImg: String,
});

const movieModel = mongoose.model("movieCollection", movieSchema);

module.exports = movieModel;
