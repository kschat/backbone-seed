var Backbone = require('backbone');

exports = module.exports = Backbone.Router.extend({
	constructor: function(options) {
		Backbone.Router.call(this, options);
		this.vent = options.vent;
	},

	routes: {
	},
});