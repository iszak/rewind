// Compile templates
module.exports = {
    app: {
        options: {
            processName: function(path) {
                return path.replace(/js\/src\/templates\/(.*)\.html/, '$1');
            }
        },

        files: {
            "js/dist/templates.js": [
                "js/src/templates/*.html",
                "js/src/templates/**/*.html"
            ]
        }
    }
};