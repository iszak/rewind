this["JST"] = this["JST"] || {};

this["JST"]["login"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<img src="img/logo-retina.png" class="logo" />\n<h1>Rewind</h1>\n<a href="#" class="login btn btn-login">Login</a>';

}
return __p
};

this["JST"]["map"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="map-canvas"></div>\n<div class="m-tabs">\n\t<a class="tab tab-map" data-type="map">MAP</a>\n\t<a class="tab tab-timeline" data-type="timeline">TIMELINE</a>\n</div>';

}
return __p
};

this["JST"]["start"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<img src="img/logo-retina.png" class="logo" />\n<h1 class="title">Rewind</h1>\n<p class="copy">\n\tLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\t\n</p>\n<p>\n\t<a class="start-button" id="start">Start</a>\n</p>';

}
return __p
};

this["JST"]["timeline"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>TIMELINE</h1>\n<div id="timeline"></div>\n<div class="m-tabs">\n\t<a class="tab tab-map" data-type="map">MAP</a>\n\t<a class="tab tab-timeline" data-type="timeline">TIMELINE</a>\n</div>';

}
return __p
};

this["JST"]["timelineItem"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'PLace: ' +
((__t = ( location.name )) == null ? '' : __t);

}
return __p
};