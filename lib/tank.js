//Control script for tamiyo dual motor
var b=require('bonescript');

var emio11="P8_15";
var emio12="P8_16";
var emio21="P8_17";
var emio22="P8_18";
var pwm01="P8_19";
var pwm02="P9_21";
var pwm03="P9_14";
var fio1="P8_12";
var data1="P8_22";


var sg5010minRange = 0.0135;
var sg5010maxRange = 0.05;

var sg90minRange = 0.01;
var sg90maxRange = 0.05;


var totalduration;
var to;
var tf;

var digipins=[
    emio11,
    emio12,
    emio21,
    emio22,
]

var pwmpins=[
    pwm01,
    pwm02,
    pwm03
    ]

var emiopins=[
    emio11,
    emio12,
    emio21,
    emio22
]


var fpins=[
    fio1
]


var datapins=[
    data1
]


var resetSystem = function resetSystem(){
    for(var x in digipins){
        b.pinMode(digipins[x], b.OUTPUT);
        b.digitalWrite(digipins[x],b.LOW);
    }
    for(var x in datapins){
        b.pinMode(datapins[x], b.OUTPUT);
        b.digitalWrite(datapins[x],b.LOW);
    }
    
    for(var x in pwmpins){
        //b.pinMode(pwmpins[x], b.OUTPUT);
        //b.pinMode(pwmpins[x], b.ANALOG_OUTPUT);
        //b.digitalWrite(pins[x],b.LOW);
    }
    for(var x in fpins){
        b.pinMode(fpins[x], b.OUTPUT);
        b.digitalWrite(fpins[x],b.LOW);
    }
    
    b.pinMode(pwm01, b.ANALOG_OUTPUT,4);
    b.pinMode(pwm02, b.ANALOG_OUTPUT,3);
    b.pinMode(pwm03, b.ANALOG_OUTPUT,6);
    
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

var headRotate2 = function headRotate2(angle){
    angle1 = sg90minRange + (angle/180)*(sg90maxRange-sg90minRange);
    b.analogWrite(pwm02, angle1, 20);
    waitabit(2000);
    angle1 = sg90minRange + ((angle-4)/180)*(sg90maxRange-sg90minRange);
    b.analogWrite(pwm02, angle1, 20);
}

var headRotate3 = function headRotate2(angle){
    angle = sg90minRange + (angle/180)*(sg5010maxRange-sg5010minRange);
    b.analogWrite(pwm03, angle, 20);
}

var fire = function fire(fireVal,duration){
    b.digitalWrite(fio1,b.HIGH);
    clearTimeout(tf);
    tf=setTimeout(function(){b.digitalWrite(fio1,b.LOW);},duration);
}


var odata = function odata(dataVal,duration){
    b.digitalWrite(datapins[dataVal],b.HIGH);
    
    switch(duration){
        case "-1":
            b.digitalWrite(datapins[dataVal],b.LOW);
            break;
        case "0":
            
            b.digitalRead(datapins[dataVal], 
                function(x){ switch (x){
                                    case "LOW"
                                        b.digitalWrite(datapins[dataVal],b.LOW);
                                        break;
                                    default:
                                        b.digitalWrite(datapins[dataVal],b.LOW);             
                }
            });
            break;
        default:
            b.digitalWrite(datapins[dataVal],b.HIGH);
            clearTimeout(tf);
            tf=setTimeout(function(){b.digitalWrite(datapins[dataVal],b.LOW);},duration);
            break;
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
  b.digitalWrite(emio22,b.HIGH);
  b.digitalWrite(emio21,b.LOW);
}
function moveBackward(){
  b.digitalWrite(emio11,b.LOW);
  b.digitalWrite(emio12,b.HIGH);
  b.digitalWrite(emio21,b.HIGH);
  b.digitalWrite(emio22,b.LOW);
}
function moveLeft(){
  b.digitalWrite(emio11,b.HIGH);
  b.digitalWrite(emio12,b.LOW);
  b.digitalWrite(emio21,b.HIGH);
  b.digitalWrite(emio22,b.LOW);
}
function moveRight(){
  b.digitalWrite(emio11,b.LOW);
  b.digitalWrite(emio12,b.HIGH);
  b.digitalWrite(emio21,b.LOW);
  b.digitalWrite(emio22,b.HIGH);
}

var halt = function halt(){
    for(var x in emiopins){
        b.digitalWrite(emiopins[x],b.LOW);
    }
    console.log("halted");
}

module.exports.odata = odata;
module.exports.resetSystem = resetSystem;
module.exports.moveRelative = moveRelative;
module.exports.headRotate = headRotate;
module.exports.headRotate2 = headRotate2;
module.exports.headRotate3 = headRotate3;
module.exports.fire = fire;
module.exports.halt=halt;
