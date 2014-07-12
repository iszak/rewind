// Compile SCSS files with Compass
module.exports = {
    cssApp: {
        options: {
            sassDir: 'css/scss',
            cssDir: 'css',
            debugInfo: false,
            noLineComments: true
        }
    },

    cssAppDist: {
        options: {
            sassDir: 'css/scss',
            cssDir: 'css',
            environment: 'production'
        }
    }
};
