//Control script for tamiyo dual motor
var b=require('bonescript');

var emio11="P8_15";
var emio12="P8_16";
var emio21="P8_17";
var emio22="P8_18";

var totalduration;
var to;

var pins=[
    emio11,
    emio12,
    emio21,
    emio22
]

var emiopins=[
    emio11,
    emio12,
    emio21,
    emio22
]

var resetSystem = function resetSystem(){
    for(var x in pins){
        b.pinMode(pins[x], b.OUTPUT);
        b.digitalWrite(pins[x],b.LOW);
    }
}


var moveRelative = function moveRelative(direction,duration) {
    console.log(direction+","+duration);
    
    switch(direction){
        case "forward":
            moveForward();
            clearTimeout(to);
            to=setTimeout(function(){halt()},duration);
        break;
        case "right":
            moveRight();
            clearTimeout(to);
            to=setTimeout(function(){halt()},duration);
        break;
        case "backward":
            moveBackward();
            clearTimeout(to);
            to=setTimeout(function(){halt()},duration);
        break;
        case "left":
            moveLeft();
            clearTimeout(to);
            to=setTimeout(function(){halt()},duration);
        break;
        case "halt":
            clearTimeout(to);
            halt();
        break;
    }
    
    
}

function moveForward(){
  b.digitalWrite(emio11,b.HIGH);
  b.digitalWrite(emio12,b.LOW);
  b.digitalWrite(emio21,b.HIGH);
  b.digitalWrite(emio22,b.LOW);
}
function moveBackward(){
  b.digitalWrite(emio11,b.LOW);
  b.digitalWrite(emio12,b.HIGH);
  b.digitalWrite(emio21,b.LOW);
  b.digitalWrite(emio22,b.HIGH);
}
function moveLeft(){
  b.digitalWrite(emio11,b.LOW);
  b.digitalWrite(emio12,b.HIGH);
  b.digitalWrite(emio21,b.HIGH);
  b.digitalWrite(emio22,b.LOW);
}
function moveRight(){
  b.digitalWrite(emio11,b.HIGH);
  b.digitalWrite(emio12,b.LOW);
  b.digitalWrite(emio21,b.LOW);
  b.digitalWrite(emio22,b.HIGH);
}

var halt = function halt(){
    for(var x in emiopins){
        b.digitalWrite(emiopins[x],b.LOW);
    }
    console.log("halted");
}

module.exports.resetSystem = resetSystem;
module.exports.moveRelative = moveRelative;
module.exports.halt=halt;

















