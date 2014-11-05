//controlscript for morsify

var m = require('./alphabet.js');
var b = require('bonescript');

pinsToLow();

var morsify = function morsify(pins,mstring,ps) {
    
    mstring=mstring.toLowerCase();
    
    for(var x in pins){
        b.pinMode(pins[x],b.OUTPUT);
    }
    
    for(var i = 0;i<mstring.length;i++){
        var letter = mstring.charAt(i);
        var mors= m.getMorse(letter);
        
        //io.sockets.socket.write(letter);
        for(var j = 0; j < mors.length;j++){
        
            console.log(letter + "["+j+"]:" +mors);
            switch (mors.charAt(j)){
                case "0":
                    pinsToHigh(pins);
                    waitabit(ps);
                    break;
                case "1":
                    pinsToHigh(pins);
                    waitabit(ps*3);
                    break;
                case "2":
                    waitabit(ps);
                    break;
                default:
                    break;
            }
            
        //parlama araları
        pinsToLow(pins);
        waitabit(ps);
        }
        //harf araları
        waitabit(ps*3);
        pinsToLow(pins);
    }
    pinsToLow(pins);

}
function waitabit (bit){
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + bit);
}


function pinsToHigh(pins){
    for(var x in pins){
        b.digitalWrite(pins[x],b.HIGH);
    }
}
function pinsToLow(pins){
    for(var x in pins){
        b.digitalWrite(pins[x],b.LOW);
    }
}

module.exports.morsify = morsify;