// JSHint JS files
module.exports = {
    app: {
        options: {
            jshintrc: '.jshintrc'
        },
        src: [
            'js/src/*.js',
            'js/src/**/*.js'
        ]
    },

    grunt: {
        src: [
            'grunt/*.js',
            'Gruntfile.js'
        ]
    }
};

