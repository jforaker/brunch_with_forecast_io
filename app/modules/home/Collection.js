/**
 * Created by jakeforaker on 7/4/14.
 */
var TempModel = require('./tempModel');

var ForecastCollection = Backbone.Model.extend({

    url: function(){
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

        //40.6700° N, 73.9400° W
        var newFore = new MakeForecast('40.7657', '-73.9158');
        var url = newFore.url + newFore.apiKey + "/" + newFore.lat + "," + newFore.long + "?callback=?";
        console.log(url);

        return url

    },

    model: TempModel,

    parse: function(data) {
        console.log(data);
        this.model = new TempModel({
            tempC: data.currently.temperature,
            tempCFeel: data.currently.apparentTemperature,
            icon: data.currently.icon
        });
        return this.model;
    }
});


module.exports = ForecastCollection;