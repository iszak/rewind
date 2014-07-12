var Application=new Marionette.Application;Application.addRegions({mainRegion:"#main"}),Application.View={Layout:{},Composite:{},Collection:{},Item:{}},Application.Collection={},Application.Router={},Application.Model={},Application.Controller={},Application.addInitializer(function(){Parse.initialize("tQwka3iy4tadatRg4ZPMmWwiR6W5ChAoMTfSkQbS","vPBf8a9VEX4FU4yRz2tsvYhlTnvj8hAuFIhmwZfr"),Parse.FacebookUtils.init({appId:"1436222829994519",channelUrl:"http://digital-memory.app.dev/channel.html",cookie:!0,xfbml:!0})}),Application.addInitializer(function(){Application.router=new Application.Router.Default}),Application.addInitializer(function(){Backbone.history.start()}),$(window).load(function(){Application.start()}),Application.Collection.Activities=Parse.Collection.extend({className:"Activity",model:Application.Model.Activity}),Application.Controller.Main=Marionette.Controller.extend({index:function(){if(Parse.User.current())window.location.hash="/map";else{var a=new Application.View.Login;Application.mainRegion.show(a)}},map:function(){var a=this.options.location,b=new Application.Collection.Activities,c=new Application.Model.Activity;b.query=new Parse.Query(Application.Model.Activity),b.fetch({success:function(b){if(Parse.User.current()){var d=new Application.View.Map({collection:b,location:a,model:c});Application.mainRegion.show(d)}else window.location.hash=""},error:function(a){console.log(a)}})}}),Application.Model.Activity=Parse.Object.extend({className:"Activity"}),Application.Model.Location=Backbone.Model.extend({defaults:{latitude:null,longitude:null},fetch:function(a){function b(a){var b=a.coords.latitude,c=a.coords.longitude,e={latitude:b,longitude:c};this.set(e),d.resolve(e)}function c(a){d.reject(a)}var d=new jQuery.Deferred,e=d.promise();return a=a||(a={}),a.success&&e.done(a.success),a.error&&e.fail(a.error),a.complete&&e.always(a.complete),navigator.geolocation.getCurrentPosition(_.bind(b,this),_.bind(c,this)),e}}),Application.Model.User=Parse.Object.extend({className:"User"}),Application.Router.Default=Backbone.Marionette.AppRouter.extend({initialize:function(){var a=new Application.Model.Location,b={location:a};this.processAppRoutes(new Application.Controller.Main(b),{"":"index",map:"map"})}}),Application.View.Activities=Backbone.Marionette.CollectionView.extend({className:"activities",render:function(){var a=Handlebars.compile($("#activities-template").html());this.$el.html(a)}}),Application.View.Activity=Backbone.Marionette.ItemView.extend({className:"activity",render:function(){var a=Handlebars.compile($("#item-template").html());this.$el.html(a)}}),Application.View.Login=Backbone.Marionette.ItemView.extend({initialize:function(){this.render()},events:{"click .login":"login"},render:function(){var a=Handlebars.compile($("#login-template").html());this.$el.html(a)},login:function(a){a.preventDefault(),Parse.FacebookUtils.logIn("email",{success:function(){window.location.hash="/map"},error:function(){alert("User cancelled the Facebook login or did not fully authorize.")}})}}),Application.View.Map=Backbone.Marionette.ItemView.extend({className:"map",initialize:function(){this.render(),this.on("show",this.renderMap),this.on("show",this.updateMap)},render:function(){var a=Handlebars.compile($("#map-template").html());this.$el.html(a)},updateMap:function(){if(null!==this.options.location.get("latitude")){var a=new google.maps.LatLng(this.options.location.get("latitude"),this.options.location.get("longitude"));this.marker=new google.maps.Marker({position:a,map:this.map,title:"Hello World!"}),this.map.setCenter(a)}},renderMap:function(){var a={zoom:8,center:new google.maps.LatLng(51.507222,-.1275)};this.map=new google.maps.Map(this.$el.find("#map-canvas").get(0),a)},onShow:function(){var a=this.options.location;null===a.get("latitude")&&a.fetch().done(_.bind(this.updateMap,this))}});
//# sourceMappingURL=app.js.map