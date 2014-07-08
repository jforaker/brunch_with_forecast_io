// Place for Handlebars custom helpers
// For example:
// Handlebars.registerHelper('eachKeyValue', function(context, block) {
//     return _.reduce(context, function(memo, value, key){
//         return memo + block.fn({'key': key, 'value': value});
//     }, "");
// });

var ForecastIO = function forecastData(){
    var forecastConfig, skycons, MakeForecast;

    forecastConfig = {
        apiKey:'c6ff3174b600aa0ebb178e6dbdc2f1cb',
        url : 'https://api.forecast.io/forecast/'
    };

    MakeForecast = function(lat, long){
        var forecast = Object.create(forecastConfig); //always have key/ url
        forecast.lat = lat;
        forecast.long = long;
        return forecast;
    };

    return new MakeForecast('40.7657', '-73.9158');
};


module.exports = ForecastIO;