const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
    id: String,
    name: String,
    state: String
}, {
    timestamps: true
});

module.exports = mongoose.model('City', CitySchema);