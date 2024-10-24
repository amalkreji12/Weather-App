const {calculateWeatherSummary,getWeatherSummary} = require('./weatherService');


const getWeatherForCity = async (req,res) => {
    const city = req.params.city;
    
    try {
        // await calculateWeatherSummary(city);
        const weatherSummary = await getWeatherSummary(city);
        res.status(200).json(weatherSummary); 
        // res.status(200).json({message:`Weather summary for ${city} generated successfully`});
    } catch {
        res.status(500).json({message:'Failed to generate weather summary'});
    }
};




module.exports = {getWeatherForCity}