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