
// Global interval for orbits.
var interval = 5; // milliseconds.

function orbit(obj, x, y, startAngle, radius, ccw, speed) {

  var newAngle = ((interval * speed) + startAngle ) % (2 * Math.PI);

  //console.log("X is: " + x);
  //console.log("Y is: " + y);
  //console.log("Speed is: "  + speed);
  //console.log("Start angle is: " + startAngle);
  //console.log("New angle: " + newAngle);
  //console.log("New angle in degrees: " + newAngle * (180 / Math.PI));

  var deltaH = (Math.cos(newAngle) * radius);

  //console.log(deltaH);
  var deltaV = (Math.sin(newAngle) * radius);
  //console.log(deltaV);

  obj.style.visibility = 'hidden';
  if (ccw) {
    obj.style.left = x + deltaH + "em";
    obj.style.top = y - deltaV + "em";
  } else {
    obj.style.left = x + deltaH + "em";
    obj.style.top = y - deltaV + "em";
  }

  obj.style.visibility = 'visible';

  //setTimeout(orbit, interval, obj, x, y, newAngle, radius, ccw, speed);
}

function inc_orbit() {

  if (this.orbital_speed) {
    orbit(this.self_object, this.x, this.y, this.angle, this.orbital_radius, this.dir, this.orbital_speed);
  }

  if (this.children) {
    for (var i = 0; i < this.children.length; i++) {
      var child = this.children[i];
      orbit(child.self_object, child.x, child.y, child.angle, child.orbital_radius, child.dir, child.orbital_speed);
    }
  }

  console.log("running");
  setTimeout(inc_orbit, interval);
}

function init() {

  var sun_obj = {
    parent_body: null,
    parent_x: null,
    parent_y: null,

    self_object : document.getElementById("sun"),
    radius : 3,

    dir : null,
    orbital_radius: null,
    orbital_speed: null,

    angle: null,
    x: 40,
    y: 40,

    children: [],
    run_orbit: inc_orbit,
    increment_spin: function() {}
  };

  var earth_obj = {
    parent_body: sun_obj,

    self_object: document.getElementById("earth"),
    radius: 1, // in EM

    dir : true,
    orbital_radius: 15,
    orbital_speed: 0.125 * ((2 * Math.PI) / 360), // radians / second

    angle: 0,
    x: sun.x + (self.radius * 0.5),
    y: sun.y,

    children: undefined,

    run_orbit: inc_orbit
  };

  sun_obj.children = [earth_obj];

}

window.onload = init;

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(callback) {
               window.setTimeout(callback, 1000 / 60);
           };
    })();

