Application.View.Item.Login = Backbone.Marionette.ItemView.extend({
    
    template: JST.login,
    className: 'mainbg',

    initialize: function(){
        //this.render();
    },

    events: {
        'click .login': 'login'
    },


    // render: function(){
    //     var template = Handlebars.compile( $('#login-template').html() );

    //     this.$el.html( template );
    // },


    login: function(event){
        event.preventDefault();

        Parse.FacebookUtils.logIn('email', {
            success: function() {
               window.location.hash = '/start';
            },
            error: function() {
                console.log('error');
            }
        });
    }
});
