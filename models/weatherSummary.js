const mongoose = require('mongoose');

const weatherSummarySchema  = new mongoose.Schema({
    city : {type:String, required:true},
    date: {type:Date, required:true},
    avgTemp: {type:Number, required:true},
    maxTemp: {type:Number, required:true},
    minTemp: {type:Number, required:true},
    dominantWeather: {type:String, required:true},
    alerts:{type:[String]}
});

module.exports = mongoose.model('WeatherSummary',weatherSummarySchema);