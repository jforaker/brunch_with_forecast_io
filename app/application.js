// Application init.
Application = {
    initialize: function() {
        var Router   = require('router');
        this.router  = new Router();
        if (typeof Object.freeze === 'function') Object.freeze(this);

        setTimeout(function(){
            if($(window).width() < 500){
                var p = $('p');
                p.addClass('hover');
                $('figure').removeClass().addClass('effect-roxy');
                $('h2').addClass('hover');
                $('#myChart').width($(window).width() - 200);
            }
        }, 1000)

    }
};

$(function() {
    Application.initialize();
    Backbone.history.start();



});

