(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
// Application init.
Application = {
    initialize: function() {
        var Router   = require('router');
        this.router  = new Router();
        if (typeof Object.freeze === 'function') Object.freeze(this);
    }
};

$(function() {
    Application.initialize();
    Backbone.history.start();
});

});

;require.register("modules/common/chartConfig", function(exports, require, module) {
/**
 * Created by jakeforaker on 7/7/14.
 */
var chartConfig = (function() {

    var chartOptions = {
        // Boolean - Whether to animate the chart
        animation: true,

        // Number - Number of animation steps
        animationSteps: 60,

        // String - Animation easing effect
        animationEasing: "easeOutQuart",

        // Boolean - If we should show the scale at all
        showScale: true,

        // Boolean - If we want to override with a hard coded scale
        scaleOverride: false,

        // ** Required if scaleOverride is true **
        // Number - The number of steps in a hard coded scale
        scaleSteps: null,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: null,
        // Number - The scale starting value
        scaleStartValue: null,

        // String - Colour of the scale line
        scaleLineColor: "rgba(0,0,0,.1)",

        // Number - Pixel width of the scale line
        scaleLineWidth: 1,

        // Boolean - Whether to show labels on the scale
        scaleShowLabels: true,

        // Interpolated JS string - can access value
        scaleLabel: "<%=value%>",

        // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
        scaleIntegersOnly: true,

        // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: false,

        // String - Scale label font declaration for the scale label
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Scale label font size in pixels
        scaleFontSize: 12,

        // String - Scale label font weight style
        scaleFontStyle: "normal",

        // String - Scale label font colour
        scaleFontColor: "#666",

        // Boolean - whether or not the chart should be responsive and resize when the browser does.
        responsive: false,

        // Boolean - Determines whether to draw tooltips on the canvas or not
        showTooltips: true,

        // Array - Array of string names to attach tooltip events
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],

        // String - Tooltip background colour
        tooltipFillColor: "rgba(0,0,0,0.8)",

        // String - Tooltip label font declaration for the scale label
        tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Tooltip label font size in pixels
        tooltipFontSize: 20,

        // String - Tooltip font weight style
        tooltipFontStyle: "normal",

        // String - Tooltip label font colour
        tooltipFontColor: "#fff",

        // String - Tooltip title font declaration for the scale label
        tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // Number - Tooltip title font size in pixels
        tooltipTitleFontSize: 20,

        // String - Tooltip title font weight style
        tooltipTitleFontStyle: "bold",

        // String - Tooltip title font colour
        tooltipTitleFontColor: "#fff",

        // Number - pixel width of padding around tooltip text
        tooltipYPadding: 6,

        // Number - pixel width of padding around tooltip text
        tooltipXPadding: 6,

        // Number - Size of the caret on the tooltip
        tooltipCaretSize: 8,

        // Number - Pixel radius of the tooltip border
        tooltipCornerRadius: 6,

        // Number - Pixel offset from point x to tooltip edge
        tooltipXOffset: 10,

        // String - Template string for single tooltips
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

        // String - Template string for single tooltips
        multiTooltipTemplate: "<%= value %>",

        // Function - Will fire on animation progression.
        onAnimationProgress: function(){},

        // Function - Will fire on animation completion.
        onAnimationComplete: function(){}
    };
    return chartOptions

})();


// add to global namespace

module.exports = chartConfig;
});

;require.register("modules/common/forecast_config", function(exports, require, module) {
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
});

;require.register("modules/common/overlay", function(exports, require, module) {
/**
 * Created by jakeforaker on 7/6/14.
 */
//
//var ShowOverlay = function() {
//    var that = this;
//    var triggerBttn = document.getElementById( 'trigger-overlay' ),
//        overlay = document.querySelector( 'div.overlay' ),
//        closeBttn = overlay.querySelector( 'button.overlay-close' );
//    transEndEventNames = {
//        'WebkitTransition': 'webkitTransitionEnd',
//        'MozTransition': 'transitionend',
//        'OTransition': 'oTransitionEnd',
//        'msTransition': 'MSTransitionEnd',
//        'transition': 'transitionend'
//    },
//        transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
//        support = { transitions : Modernizr.csstransitions };
//    function toggleOverlay() {
//        if( classie.has( overlay, 'open' ) ) {
//            classie.remove( overlay, 'open' );
//            classie.add( overlay, 'close' );
//            var onEndTransitionFn = function( ev ) {
//                if( support.transitions ) {
//                    if( ev.propertyName !== 'visibility' ) return;
//                    this.removeEventListener( transEndEventName, onEndTransitionFn );
//                }
//                classie.remove( overlay, 'close' );
//            };
//            if( support.transitions ) {
//                overlay.addEventListener( transEndEventName, onEndTransitionFn );
//            }
//            else {
//                onEndTransitionFn();
//            }
//        }
//        else if( !classie.has( overlay, 'close' ) ) {
//            classie.add( overlay, 'open' );
//        }
//    }
//
//    function backHome(){
//        $(that.el).hide();
//        Backbone.history.navigate('');
//    }
//
//    toggleOverlay();
//
//
//
//    closeBttn.addEventListener( 'click', backHome );
//    return this
//};
//
//module.exports = ShowOverlay;


var showIt = ( function( window ) {

    function Overlay() {
        this.el = document.querySelector('div.overlay');
        this._init();
    }

    Overlay.prototype = {

        _init : function() {
            var that = this;
            that._open();
        },

        _open: function(){
            console.log("OOPEENNNN");
            var that = this;
            $(that.el).removeClass('close');
            $('.overlay').addClass('open');
            console.log($(that.el));
            return  $(that.el).addClass('open');
        },

        _close: function(){
            console.log("CLODININSINIS");
            var that = this;
            var o =  that.el;
            classie.remove( o, 'open' );
            classie.add( o, 'close' );
        }
    };

    return Overlay

} )( window );


module.exports = showIt;
});

;require.register("modules/home/Collection", function(exports, require, module) {
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
});

;require.register("modules/home/details", function(exports, require, module) {
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
});

;require.register("modules/home/detailsModel", function(exports, require, module) {
/**
 * Created by jakeforaker on 7/6/14.
 */
var DetailsModel = Backbone.Model.extend({

    defaults:{
        icon: '',
        tempC: '',
        tempCFeel: ''
    }
});


module.exports = DetailsModel;
});

;require.register("modules/home/detailsTemplate", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <p>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ": <a href=\"";
  if (helper = helpers.uri) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.uri); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">";
  if (helper = helpers.uri) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.uri); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></p>\n    ";
  return buffer;
  }

  buffer += "<div class=\"overlay overlay-hugeinc\">\n    <button type=\"button\" class=\"overlay-close\">Close</button>\n\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.alert), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n\n            <figure>\n                <figcaption>\n\n                    <h2><span class=\"timespan\">";
  if (helper = helpers.time) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.time); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>";
  if (helper = helpers.summary) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.summary); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n                    <h2 class=\"";
  if (helper = helpers.precipProbability) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.precipProbability); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">chance of rain: ";
  if (helper = helpers.precipProbability) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.precipProbability); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "%</h2>\n\n\n                    <div class=\"canvas-holder\">\n                        <canvas class=\"";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" width=\"111\" height=\"111\">";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</canvas>\n                    </div>\n\n                    <div class=\"chart-holder\">\n                        <canvas id=\"myChart\" width=\"666\" height=\"400\" style=\"margin: 0 auto\"></canvas>\n                    </div>\n\n                </figcaption>\n            </figure>\n\n</div>\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("modules/home/home", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <p style=\"color: orangered\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ": <a href=\"";
  if (helper = helpers.uri) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.uri); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">";
  if (helper = helpers.uri) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.uri); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></p>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <a href=\"#details/";
  if (helper = helpers.time) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.time); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                <figure class=\"";
  if (helper = helpers.klass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.klass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <img class=\"img\"/>\n                    <figcaption>\n                        <div>\n                            <h4><span class=\"time\">";
  if (helper = helpers.time) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.time); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> </h4>\n                            <p>\n                                <canvas class=\""
    + escapeExpression(((stack1 = (depth0 && depth0.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" width=\"111\" height=\"111\">";
  if (helper = helpers.icon) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icon); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</canvas>\n                            </p>\n\n                        </div>\n\n                        <h2 class=\"\">";
  if (helper = helpers.summary) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.summary); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n\n                    </figcaption>\n                </figure>\n                </a>\n            ";
  return buffer;
  }

  buffer += "\n\n<div id=\"content\">\n    <div class=\"grid\">\n        <header class=\"codrops-headers\" style=\"background-size: cover;background-repeat: no-repeat;\">\n            <h1>Current weather</h1>\n            <canvas id=\"icon\" width=\"128\" height=\"128\"></canvas>\n            <h1>";
  if (helper = helpers.rightNow) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rightNow); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " - ";
  if (helper = helpers.tempC) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tempC); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.alert), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        </header>\n\n        <h3> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.daily)),stack1 == null || stack1 === false ? stack1 : stack1.summary)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.daily), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>\n<div id=\"deets\">\n    <div class=\"overlay close\" style=\"display: none\"></div>\n</div>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("modules/home/tempModel", function(exports, require, module) {
/**
* Created by jakeforaker on 2/26/14.
*/
var Temp = Backbone.Model.extend({

    defaults:{
        icon: '',
        tempC: '',
        tempCFeel: ''
    }
});


module.exports = Temp;
});

;require.register("modules/home/views", function(exports, require, module) {
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
});

;require.register("router", function(exports, require, module) {
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

});

;
//# sourceMappingURL=app.js.map