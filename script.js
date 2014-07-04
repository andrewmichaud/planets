
function orbit(obj, x, y, startAngle, radius, ccw, speed) {

  var interval = 75; // milliseconds

  var newAngle = ((interval * speed) + startAngle ) % (2 * Math.PI);

  console.log("X is: " + x);
  console.log("Y is: " + y);
  console.log("Speed is: "  + speed);
  console.log("Start angle is: " + startAngle);
  console.log("New angle: " + newAngle);
  console.log("New angle in degrees: " + newAngle * (180 / Math.PI));

  var deltaH = (Math.cos(newAngle) * radius);

  //console.log(deltaH);
  var deltaV = (Math.sin(newAngle) * radius);
  //console.log(deltaV);

  if (ccw) {
    obj.style.left = x + deltaH + "em";
    obj.style.top = y - deltaV + "em";
  }

  setTimeout(orbit, interval, obj, x, y, newAngle, radius, ccw, speed);
}


function init() {

  var obj = document.getElementById("circle");

  obj.style.left = "44em";
  obj.style.top = "44em";
  var x = 25;
  var y = 25;
  var radius = 15;
  var ccw = true;
  var angle = 0; // radians
  var speed = 0.500; // radians / second

  orbit(obj, x, y, 0, radius, ccw, speed);

}

window.onload = init;

