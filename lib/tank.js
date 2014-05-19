//Control script for tamiyo dual motor
var b=require('bonescript');

var emio11="P8_15";
var emio12="P8_16";
var emio21="P8_17";
var emio22="P8_18";
var pwm01="P8_19";



var sg5010minRange = 0.0135;
var sg5010maxRange = 0.05;


var totalduration;
var to;

var digipins=[
    emio11,
    emio12,
    emio21,
    emio22
]

var pwmpins=[
    pwm01
    ]

var emiopins=[
    emio11,
    emio12,
    emio21,
    emio22
]

var resetSystem = function resetSystem(){
    for(var x in digipins){
        b.pinMode(digipins[x], b.OUTPUT);
        b.digitalWrite(digipins[x],b.LOW);
    }
    for(var x in pwmpins){
        b.pinMode(pwmpins[x], b.OUTPUT);
        //b.digitalWrite(pins[x],b.LOW);
    }
    waitabit(2000);
    headRotate(90);
}

function waitabit (bit){
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + bit);
}


var headRotate = function headRotare(angle){
    angle = sg5010minRange + (angle/180)*(sg5010maxRange-sg5010minRange);
    b.analogWrite(pwm01, angle, 20);
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
module.exports.headRotate = headRotate;
module.exports.halt=halt;
