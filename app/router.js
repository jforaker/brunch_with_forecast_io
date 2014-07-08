var HomeView = require('modules/home/views');
var DetailsView = require('modules/home/details');
var utils = require('modules/common/forecast_config');
var DetailsModel = require('modules/home/detailsModel');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'home',
        'details/:id': 'details'
    },

    home: function() {
        console.log('home');
        $('#main').html(new HomeView().render());
    },

    details: function(id){
        var that =this;
        console.log('IIIDDD ==  ' + id);
        var newFore = new utils();
        this.time = id;
        var  detailsView = new DetailsView();
//
//
//        function getval( callback ){
//            $.getJSON(newFore.url + newFore.apiKey + "/" + newFore.lat + "," + newFore.long + "," + that.time + "?callback=?", function(data) {
//                callback(data);
//            });
//        }
//
//        getval( function ( o ) {
//            var modd = new DetailsModel({
//                data : o
//            });
//            console.log(modd);
//
//           // that.render(modd);
//            $('#main').html(detailsView.render(modd).$el);
//            detailsView.delegateEvents();
//
//        });
        detailsView.initialize(id);

    }

});
