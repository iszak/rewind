// Minify CSS files
module.exports = {
    cssLib: {
        options: {},
        files: {
            'css/lib.css': [
                'components/normalize.css/normalize.css',
                'components/html5-boilerplate/css/main.css'
            ]
        }
    }
};
