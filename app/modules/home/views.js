var template = require('./home');
var TempModel = require('./tempModel');
var ForecastCollection = require('modules/home/Collection');
var utils = require('modules/common/forecast_config');

var HomeView = Backbone.View.extend({
    template: template,
    model: TempModel,
    el: "#main",
    initialize: function(){

        this.collection = new ForecastCollection();

        var newFore = new utils();
        console.log(newFore);
        var that = this;

        function getval( callback ){
            $.getJSON(newFore.url + newFore.apiKey + "/" + newFore.lat + "," + newFore.long + "?callback=?", function(data) {
                callback(data);
            });
        }

        getval( function ( o ) {
            var modd = new TempModel({
                data : o,
                tempC: o.currently.temperature,
                tempCFeel: o.currently.apparentTemperature,
                icon: o.currently.icon
            });
            console.log(modd);

            that.render(modd);
        });

        /*
         Key:
         08db47bcad763eaab656eb51e4726090

         Secret:
         abb098b40a36e159
         https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=97bf61b0cb5de432ad70112467e1d734&tags=sun&format=json&nojsoncallback=1
         https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
         */



    },

    getDayName: function(){
        return 'wednesday'
    },

    render: function(model){
        $('#temp').hide();
        var skyconTop = new Skycons({
            "color": "white"
        });
        var icooo = typeof model.get('icon') !== 'undefined' ? model.get('icon') : '';




        var alerts = model.attributes.data.alerts;
        var time = model.attributes.data.currently.time;

        var bgimage = function(){
            var u = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=08db47bcad763eaab656eb51e4726090&&tags='+encodeURI(icooo)+'&media=photos&per_page=10&page=1&format=json&nojsoncallback=1';
            console.log(u);
            $.getJSON(u, function(d) {
                var num = Math.floor(Math.random() * 10) + 1;
                var b = 'https://farm'+d.photos.photo[num].farm+'.staticflickr.com/'+d.photos.photo[num].server+'/'+d.photos.photo[num].id+'_'+d.photos.photo[num].secret+'_b.jpg';
                console.log(b)
                $('.codrops-header').css('background-image', 'url(' + b + ')');

            });

        };

        bgimage();
        console.log(model)

        this.$el.html(this.template({
            rightNow: model.attributes.data.currently.summary,
            time: moment.unix(time).format(" h:mm:ss a" + " " + "MM/DD/YYYY"),
            alert: alerts,
            summary: model.get('summary'),
            tempC: model.get('tempC'),
            tempCFeel: model.get('tempCFeel'),
            icon: model.get('icon'),
            daily: model.attributes.data.daily
        }));


        skyconTop.set( 'icon', icooo.toUpperCase());
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
            ],
            klasses = [
                "effect-lily",
                "effect-marley",
                "effect-roxy",
                "effect-bubba",
                "effect-layla",
                "effect-marley",
                "effect-ruby",
                "effect-sarah"
            ],
            i;

        for(i = list.length; i--; ) {
            var weatherType = list[i],
                elements = document.getElementsByClassName(weatherType);

            for (var e = elements.length; e--;){

                icons.set( elements[e], weatherType );

            }
        }




        for(var a = 0; a < klasses.length; a++ ) {
            var klass = klasses[a];
            var els = $('figure');
            var imgs = $('.img');

            $(els[a]).addClass( klass );
        }

        var fig = $('figure');

        function encoder(query){
            var str = query;
            str = str.replace(/-/g, ' ');
            return str
        }

        fig.each(function(i, figure){
            var iconName = $(this).find('canvas').attr('class'); //same as icon name
            var q = encoder(iconName);
            var that = $(this);

            var firstDay = moment.unix($(this).find('.time').text()).format("dddd");
            $(this).find('.time').text(firstDay);

            (function getPic(){
                var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=08db47bcad763eaab656eb51e4726090&&tags='+encodeURI(q)+'&media=photos&per_page=10&page=1&format=json&nojsoncallback=1';
                console.log(url);
                $.getJSON(url, function(d) {
                    var num = Math.floor(Math.random() * 10) + 1;
                    var build = 'https://farm'+d.photos.photo[num].farm+'.staticflickr.com/'+d.photos.photo[num].server+'/'+d.photos.photo[num].id+'_'+d.photos.photo[num].secret+'.jpg';
                    that.find('img').attr('src', build);
                });
            })();
        });

        icons.play();
        skyconTop.play();

        return this;
    }
});

module.exports = HomeView;