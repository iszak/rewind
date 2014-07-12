Application.View.Login = Backbone.Marionette.ItemView.extend({

    initialize: function(){
        this.render();
    },

    events: {
        "click .login": "login"
    },

    render: function(){
        var template = Handlebars.compile( $("#login-template").html() );

        this.$el.html( template );
    },

    login: function(event){
        event.preventDefault();

        Parse.FacebookUtils.logIn('email', {
            success: function(user) {
               window.location.hash = '/activities';
            },
            error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    }


});