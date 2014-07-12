var Application=new Marionette.Application;Application.addRegions({mainRegion:"#main"}),Application.View={Layout:{},Composite:{},Collection:{},Item:{}},Application.Collection={},Application.Router={},Application.Model={},Application.Controller={},Application.addInitializer(function(){Parse.initialize("tQwka3iy4tadatRg4ZPMmWwiR6W5ChAoMTfSkQbS","vPBf8a9VEX4FU4yRz2tsvYhlTnvj8hAuFIhmwZfr"),Parse.FacebookUtils.init({appId:"1436222829994519",channelUrl:"http://digital-memory.app.dev/channel.html",cookie:!0,xfbml:!0})}),Application.addInitializer(function(){Application.router=new Application.Router.Default}),Application.addInitializer(function(){Backbone.history.start()}),$(window).load(function(){Application.start()}),Application.View.Item.Activity=Backbone.Marionette.ItemView.extend({className:"activity"}),Application.View.Item.Login=Backbone.Marionette.ItemView.extend({template:JST.login,initialize:function(){},events:{"click .login":"login"},login:function(a){a.preventDefault(),Parse.FacebookUtils.logIn("email",{success:function(){window.location.hash="/map"},error:function(){alert("User cancelled the Facebook login or did not fully authorize.")}})}}),Application.View.Item.Map=Backbone.Marionette.ItemView.extend({className:"map",template:JST.map,initialize:function(){this.on("show",this.renderMap),this.on("show",this.updateMap)},updateMap:function(){if(null!==this.options.location.get("latitude")){var a=new google.maps.LatLng(this.options.location.get("latitude"),this.options.location.get("longitude"));this.marker=new google.maps.Marker({position:a,map:this.map,title:"Hello World!"}),this.map.setCenter(a)}},renderMap:function(){var a=[{elementType:"geometry.fill",stylers:[{saturation:-98}]},{featureType:"road",stylers:[{color:"#36393d"},{visibility:"simplified"}]},{featureType:"landscape",stylers:[{color:"#3f4248"}]},{elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"transit.station",stylers:[{visibility:"off"}]},{}],b={zoom:16,center:new google.maps.LatLng(51.507222,-.1275),styles:a,disableDefaultUI:!0};this.map=new google.maps.Map(this.$el.find("#map-canvas").get(0),b)},onShow:function(){var a=this.options.location;null===a.get("latitude")&&a.fetch().done(_.bind(this.updateMap,this))}}),Application.View.Item.Start=Backbone.Marionette.ItemView.extend({template:JST.start,initialize:function(){},events:{}}),Application.View.Collection.Activities=Backbone.Marionette.CollectionView.extend({className:"activities",childView:Application.View.Activity,render:function(){var a=Handlebars.compile($("#activities-template").html());this.$el.html(a)}}),Application.Model.Activity=Parse.Object.extend({className:"Activity"}),Application.Model.Location=Parse.Object.extend({className:"Location",defaults:{latitude:null,longitude:null},watchInterval:null,fetch:function(a){function b(a){var b=a.coords.latitude,c=a.coords.longitude,e={latitude:b,longitude:c};this.set(e),d.resolve(e)}function c(a){d.reject(a)}var d=new jQuery.Deferred,e=d.promise();return a=a||(a={}),a.success&&e.done(a.success),a.error&&e.fail(a.error),a.complete&&e.always(a.complete),navigator.geolocation.getCurrentPosition(_.bind(b,this),_.bind(c,this)),e},watch:function(a){this.watchInterval=setInterval(_.bind(this.fetch,this),a)},unwatch:function(){clearInterval(this.watchInterval)}}),Application.Model.User=Parse.Object.extend({className:"User"}),Application.Collection.Activities=Parse.Collection.extend({className:"Activity",model:Application.Model.Activity}),Application.Collection.Locations=Parse.Collection.extend({className:"Location",model:Application.Model.Location,updateUserLocation:function(a){this.updateUserLatLng(a),this.calculateDistances()},updateUserLatLng:function(a){this.userLatLng=new google.maps.LatLng(a.get("latitude"),a.get("longitude"))},calculateDistances:function(){this.forEach(this.calculateDistance,this)},calculateDistance:function(a){var b=this.userLatLng,c=a.get("location").latitude,d=a.get("location").longitude,e=new google.maps.LatLng(c,d),f=google.maps.geometry.spherical.computeDistanceBetween(b,e);a.set("distance",f)},closest:function(a){var b=this.filter(function(b){return b.get("distance")<a});return b[0]}}),Application.Controller.Main=Marionette.Controller.extend({index:function(){Parse.User.current()?Application.router.navigate("/start",!0):Application.router.navigate("/login",!0)},login:function(){var a=new Application.View.Item.Login;Application.mainRegion.show(a)},start:function(){var a=new Application.View.Item.Start;Application.mainRegion.show(a)},map:function(){var a=this.options.location,b=new Application.Collection.Activities,c=new Application.Model.Activity;b.query=new Parse.Query(Application.Model.Activity);var d=b.fetch();d.then(function(){var d=new Application.View.Item.Map({collection:b,location:a,model:c});Application.mainRegion.show(d)},function(a){alert(a)})},timeline:function(){var a=new Application.Collection.Activities,b=new Application.Model.Activity;a.query=new Parse.Query(Application.Model.Activity);var c=a.fetch();c.then(function(){var c=new Application.View.Collection.Activities({collection:a,model:b});Application.mainRegion.show(c)},function(a){alert(a)})}}),Application.Router.Default=Backbone.Marionette.AppRouter.extend({initialize:function(){function a(a){alert(a)}function b(){d.on("change",c),d.watch(5e3)}function c(a){e.updateUserLocation(a);var b=e.closest(100);console.log(b.toJSON())}var d=new Application.Model.Location,e=new Application.Collection.Locations;e.fetch().then(_.bind(b,this),_.bind(a,this));var f={location:d};this.processAppRoutes(new Application.Controller.Main(f),{"":"index",map:"map",login:"login",start:"start",timeline:"timeline"})}});
//# sourceMappingURL=app.js.map