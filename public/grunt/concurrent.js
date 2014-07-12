// Run tasks concurrently
module.exports = {
    default: {
        tasks: ['js', 'css', 'img'],
        options: {
            logConcurrentOutput: true
        }
    },

    js: {
        tasks: ['js:lib', 'js:ext', 'js:polyfill', 'js:app'],
        options: {
            logConcurrentOutput: true
        }
    },

    css: {
        tasks: ['css:app', 'css:lib'],
        options: {
            logConcurrentOutput: true
        }
    }
};
