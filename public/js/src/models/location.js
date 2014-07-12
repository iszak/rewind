Application.Model.Location = Backbone.Model.extend({
    defaults: {
        latitude  : null,
        longitude : null
    },


    fetch: function(options) {
        var deferred = new jQuery.Deferred();

        // Promise object
        var promise = deferred.promise();

        // Options
        options = options || (options = {});

        // Callbacks
        if (options.success) {
            promise.done(options.success);
        }

        if (options.error) {
            promise.fail(options.error);
        }

        if (options.complete) {
            promise.always(options.complete);
        }


        function onSuccess(position) {
            var latitude = position.coords.latitude,
                longitude = position.coords.longitude;

            var data = {
                latitude: latitude,
                longitude: longitude
            };

            // Set the data to the model
            this.set(data);

            // Resolve the promise
            deferred.resolve(data);
        }


        function onError(error) {
            // Reject the promise
            deferred.reject(error);
        }


        // Get geolocation
        navigator.geolocation.getCurrentPosition(
            _.bind(onSuccess, this),
            _.bind(onError, this)
        );


        return promise;
    }
});
