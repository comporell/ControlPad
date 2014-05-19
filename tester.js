var b = require('bonescript');
var SERVO = 'P8_19';
var minRange = 0.0135;
var maxRange = 0.05;

b.pinMode(SERVO, b.OUTPUT);
updateDuty(90);

function updateDuty(angle) {
    // compute and adjust duty_cycle based on
    // desired position in range 0..1
    //b.analogWrite(SERVO, duty_cycle, 60, ask());
    
    angle = minRange + (angle/180)*(maxRange-minRange);
    
    b.analogWrite(SERVO, angle, 20);
    console.log("angle: "+angle);
    askcallback(angle);
}

function ask(question, format, callback) {
 var stdin = process.stdin, stdout = process.stdout;
 
 stdin.resume();
 stdout.write(question + ": ");
 
 stdin.once('data', function(data) {
   data = data.toString().trim();
 
   if (data) {
     callback(data);
   } else {
     stdout.write("It should match: "+ format +"\n");
     ask(question, format, callback);
   }
 });
}

function askcallback(width){
    ask("width", /.+/, function(width) {
        updateDuty(parseFloat(width));
        //process.exit();
        });
}