// Minify JS files
module.exports = {
    // Libraries (jQuery, Zepto, etc.)
    lib: {
        options: {
            sourceMap: true
        },
        src: [
            'components/jquery/dist/jquery.js',
            'components/underscore/underscore.js',
            'components/backbone/backbone.js',
            'components/handlebars/handlebars.js'
        ],
        dest: 'js/dist/lib.js'
    },


    // Extensions (Backbone Marionette, jQuery Mobile)
    ext: {
        options: {
            sourceMap: true
        },
        src: [
            'components/marionette/lib/backbone.marionette.js'
        ],
        dest: 'js/dist/ext.js'
    },


    // Application (Views, Models, Routers, etc.)
    app: {
        options: {
            sourceMap: true
        },
        src: [
            'js/src/app.js',
            'js/src/*.js',
            'js/src/**/*.js'
        ],
        dest: 'js/dist/app.js'
    }
};
