;(function(global, undefined) {
    'use strict';

    var _ = require('underscore'),
    	$ = require('jQuery'),
    	Backbone = require('backbone');

    var App = {};
    
    App.vent = _.extend({}, Backbone.Events);

    App.views = {};
    App.collections = {};

    //Call router before this
    Backbone.history.start({ pushState: true, slient: true });

    $(function() {

        //pulse sent on initial page load
	    App.vent.trigger('nav:select', { sender: Backbone.history.fragment || 'about' });
    });

    //Used to call router navigate function on specific links
    $(document).on('click', 'a[data-bypass]', function(e) {
    	var href = $(this).attr('href'),
    		protocol = this.protocol + '//';

    	if(href.slice(protocol.length) !== protocol) {
    		e.preventDefault();
    		App.router.navigate(href, true);
    	}
    });
})(window);