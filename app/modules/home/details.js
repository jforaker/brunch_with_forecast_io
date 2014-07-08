/**
 * Created by jakeforaker on 7/6/14.
 */
var template = require('./detailsTemplate');
var DetailsModel = require('./detailsModel');
var ShowOverlay = require('modules/common/overlay');
var utils = require('modules/common/forecast_config');
var ChartConfigs = require('modules/common/chartConfig');

var DetailsView = Backbone.View.extend({
    template: template,
    model: DetailsModel,
    el: "#deets",
    events: {
        'click button.overlay-close': 'closeIt'
    },

    initialize: function(time){
        var that = this;
        var newFore = new utils();
        _.bindAll(this, 'render', 'closeIt');
        this.time = time;

        function getval( callback ){
            $.getJSON(newFore.url + newFore.apiKey + "/" + newFore.lat + "," + newFore.long + "," + that.time + "?callback=?", function(data) {
                callback(data);
            });
        }

        getval( function ( o ) {
            var modd = new DetailsModel({
                data : o
            });
            console.log(modd);
            that.render(modd);
        });
    },

    closeIt: function(){
        var a = new ShowOverlay();
        a._close();
        Backbone.history.navigate('');
    },

    render: function(model){
        var that = this;
        var a = new ShowOverlay();
        var temps = [];
        var precipProbability = [];
        for(var x = 0; x < model.attributes.data.hourly.data.length; x++){
            var data = model.attributes.data.hourly.data[x];
            temps.push(data.temperature);
            precipProbability.push(data.precipProbability);
        }
        var dat = {
            /*
             12AM 2AM 4AM 6AM 8AM 10AM noon 2PM 4PM 6PM 8PM 10PM
             */
            labels: ["12AM", "2AM", "4AM", "6AM", "8AM", "10AM", "noon", "2PM", "4PM", "6PM", "8PM", "10PM", "3", "4", "5", "6", "7", "8", "9", "10", "asdf", "asdf", "asdf", "asdf"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: temps
                },
                {
                    label: "My second dataset",
                    fillColor : "rgba(151,187,205,0.2)",
                    strokeColor : "rgba(151,187,205,1)",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor : "#fff",
                    pointHighlightFill : "#fff",
                    pointHighlightStroke : "rgba(151,187,205,1)",
                    data: precipProbability
                }
            ]
        };



        setTimeout(function(){
            $(that.el).show();
            a._open();

            var ctx = $("#myChart").get(0).getContext("2d");
            new Chart(ctx).Line(dat, ChartConfigs);

        }, 1);

        var current = model.attributes.data.currently;
        var alerts = model.attributes.data.alerts;

        this.$el.html(this.template({
            alert: alerts,
            time: current.time,
            icon: current.icon,
            summary: model.attributes.data.daily.data[0].summary,
            daily: model.attributes.data.daily,
            precipProbability: current.precipProbability > 0.05 ? current.precipProbability * 100 : 'none'
        }));



        var icons = new Skycons({"color":"white"}),
            list = [
                "clear-day",
                "clear-night",
                "partly-cloudy-day",
                "partly-cloudy-night",
                "cloudy",
                "rain",
                "sleet",
                "snow",
                "wind",
                "fog"
            ], i;

        for(i = list.length; i--; ) {
            var weatherType = list[i],
                elements = document.getElementsByClassName(weatherType);
            for (var e = elements.length; e--;){
                icons.set( elements[e], weatherType );
            }
        }



        var fig = $('figure');
        var timespan = fig.find('.timespan');
        var firstDay = moment.unix(timespan.text()).format("dddd");
        timespan.text(firstDay);

        icons.play();

        return this;
    }
});

module.exports = DetailsView;