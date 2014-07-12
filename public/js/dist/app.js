var Application=new Marionette.Application;Application.addRegions({mainRegion:"#main"}),Application.View={Layout:{},Composite:{},Collection:{},Item:{}},Application.Collection={},Application.Router={},Application.Model={},Application.Controller={},Application.addInitializer(function(){Parse.initialize("tQwka3iy4tadatRg4ZPMmWwiR6W5ChAoMTfSkQbS","vPBf8a9VEX4FU4yRz2tsvYhlTnvj8hAuFIhmwZfr"),Parse.FacebookUtils.init({appId:"1436222829994519",channelUrl:"http://digital-memory.app.dev/channel.html",cookie:!0,xfbml:!0})}),Application.addInitializer(function(){Application.router=new Application.Router.Default}),Application.addInitializer(function(){Backbone.history.start()}),$(window).load(function(){Application.start()}),Application.View.Item.Activity=Backbone.Marionette.ItemView.extend({className:"activity"}),Application.View.Item.Login=Backbone.Marionette.ItemView.extend({template:JST.login,className:"mainbg",initialize:function(){},events:{"click .login":"login"},login:function(a){a.preventDefault(),Parse.FacebookUtils.logIn("email",{success:function(){window.location.hash="/start"},error:function(){console.log("error")}})}}),Application.View.Item.Map=Backbone.Marionette.ItemView.extend({className:"map",template:JST.map,markers:[],initialize:function(){this.location=this.options.location,this.listenTo(this.location,"change",this.renderUser),this.listenTo(this.collection,"sync",this.renderActivities),this.listenTo(this.collection,"add",this.renderActivity),this.on("show",this.renderMap)},renderActivity:function(a){var b=a.get("location");if(void 0!==b){var c=new google.maps.LatLng(b.get("location").latitude,b.get("location").longitude),d=new google.maps.Marker({position:c,map:this.map,title:b.get("name"),icon:"img/venue.png"});this.markers.push(d)}},renderActivities:function(){void 0!==this.map&&0!==this.collection.length&&this.collection.forEach(this.renderActivity,this)},renderUser:function(){if(void 0!==this.map&&null!==this.location.get("latitude")){var a=new google.maps.LatLng(this.location.get("latitude"),this.location.get("longitude"));void 0===this.marker&&(this.marker=new google.maps.Marker({map:this.map,title:"Your Location",icon:"img/man.png"})),this.marker.setPosition(a),this.map.setCenter(a)}},renderMap:function(){var a=[{elementType:"geometry.fill",stylers:[{saturation:-98}]},{featureType:"road",stylers:[{color:"#36393d"},{visibility:"simplified"}]},{featureType:"landscape",stylers:[{color:"#3f4248"}]},{elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"transit.station",stylers:[{visibility:"off"}]},{}],b={zoom:16,center:new google.maps.LatLng(51.507222,-.1275),styles:a,disableDefaultUI:!0};this.map=new google.maps.Map(this.$el.find("#map-canvas").get(0),b),this.renderUser(),this.renderUser()}}),Application.View.Item.Start=Backbone.Marionette.ItemView.extend({template:JST.start,className:"mainbg m-start",events:{"click #start":"start"},start:function(){return Application.router.navigate("/timeline",!0)}}),Application.View.Item.TimelineActivity=Backbone.Marionette.ItemView.extend({className:"timeline-activity",template:JST.timeline}),Application.View.Collection.Activities=Backbone.Marionette.CollectionView.extend({className:"activities",childView:Application.View.Item.Activity}),Application.Collection.Timline=Backbone.Marionette.CollectionView.extend({className:"timeline",childView:Application.View.Item.TimelineActivity}),Application.Model.Activity=Parse.Object.extend({className:"Activity",initialize:function(){this.on("change:user",this.updateACL)},updateACL:function(){var a=this.get("user");if(null!==a){var b={};b[a.id]={write:!0,read:!0},this.setACL(b)}}}),Application.Model.Location=Parse.Object.extend({className:"Location",defaults:{latitude:null,longitude:null},watchInterval:null,fetch:function(a){function b(a){var b=a.coords.latitude,c=a.coords.longitude,e={latitude:b,longitude:c};this.set(e),d.resolve(e)}function c(a){d.reject(a)}var d=new jQuery.Deferred,e=d.promise();return a=a||(a={}),a.success&&e.done(a.success),a.error&&e.fail(a.error),a.complete&&e.always(a.complete),navigator.geolocation.getCurrentPosition(_.bind(b,this),_.bind(c,this)),e},watch:function(a){this.watchInterval=setInterval(_.bind(this.fetch,this),a)},unwatch:function(){clearInterval(this.watchInterval)}}),Application.Model.User=Parse.Object.extend({className:"User"}),Application.Collection.Activities=Parse.Collection.extend({className:"Activity",model:Application.Model.Activity}),Application.Collection.Locations=Parse.Collection.extend({className:"Location",model:Application.Model.Location,initialize:function(a){a.location&&(this.location=a.location,this.location.on("change",_.bind(this.distanceUpdate,this)))},distanceUpdate:function(a){var b=new google.maps.LatLng(a.get("latitude"),a.get("longitude"));this.forEach(function(a){var c=a.get("location").latitude,d=a.get("location").longitude,e=new google.maps.LatLng(c,d),f=google.maps.geometry.spherical.computeDistanceBetween(b,e);a.set("distance",f)}),this.trigger("distance:update",this)},closest:function(a){var b=this.filter(function(b){return b.get("distance")<a});return b.length>0?b[0]:null}}),Application.Controller.Main=Marionette.Controller.extend({index:function(){Parse.User.current()?Application.router.navigate("/start",!0):Application.router.navigate("/login",!0)},login:function(){var a=new Application.View.Item.Login;Application.mainRegion.show(a)},start:function(){if(!Parse.User.current())return Application.router.navigate("/login",!0);var a=new Application.View.Item.Start;Application.mainRegion.show(a)},map:function(){if(!Parse.User.current())return Application.router.navigate("/login",!0);var a=this.options.location,b=this.options.activities;b.fetch();var c=new Application.Model.Activity,d=new Application.View.Item.Map({collection:b,location:a,model:c});Application.mainRegion.show(d)},timeline:function(){if(!Parse.User.current())return Application.router.navigate("/login",!0);var a=this.options.location;a.fetch();var b=new Application.Model.Activity,c=new Application.Collection.Timline;c.query=new Parse.Query(Application.Model.Activity),c.query.include("location"),c.fetch();var d=new Application.View.Item.Map({collection:c,model:b});Application.mainRegion.show(d)}}),Application.Router.Default=Backbone.Marionette.AppRouter.extend({initialize:function(){function a(a){alert(a)}function b(a){var b=a.closest(100);b&&c(b)}function c(b){if(b!==i){i=b;var c=new Application.Model.Activity;c.set("user",e),c.set("location",b),c.save().then(d,a)}}function d(a){console.log("Activity saved"),g.add(a)}var e=Parse.User.current(),f=new Application.Model.Location,g=new Application.Collection.Activities;g.query=new Parse.Query(Application.Model.Activity),g.query.include("location");var h=new Application.Collection.Locations({location:f}),i=null;this.listenTo(h,"distance:update",b),h.fetch(),f.fetch(),f.watch(1e4);var j={location:f,locations:h,activities:g};this.processAppRoutes(new Application.Controller.Main(j),{"":"index",login:"login",start:"start",map:"map",timeline:"timeline"})}});
//# sourceMappingURL=app.js.map