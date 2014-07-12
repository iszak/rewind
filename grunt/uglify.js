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
            'components/backbone/backbone.js'
        ],
        dest: 'js/dist/lib.js'
    },


    // Extensions (Backbone Marionette, jQuery Mobile)
    ext: {
        options: {
            sourceMap: true
        },
        src: [],
        dest: 'js/dist/ext.js'
    },


    // Polyfills (Console, ES5, ES6, etc.)
    polyfills: {
        options: {
            sourceMap: true
        },
        src: [
            'components/console-polyfill/index.js',
            'components/picturefill/src/picturefill.js',
            'components/json3/lib/json3.js'
        ],
        dest: 'js/dist/polyfills.js'
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
