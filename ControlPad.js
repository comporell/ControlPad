/*CONTROLPAD v0.1 by Trevize Daneel
This is a control script for Beaglebone Black
email: comporell@gmail.com
*/

var b = require('bonescript');
var t = require('./lib/tank.js');

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs= require('fs');

function handler(req,res){
 fs.readFile('index.html',
    function(err,data){
        if(err){
            res.writeHead(500);
            return res.end('500.html');
        }
        
        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection',function(socket){
    socket.on('sendval',function(data){
        console.log("Socket :" + socket);
        console.log("Request :" + data);
        control(data.toLowerCase());
        //socket.emit('datastatus','sent');
        //socket.broadcast.emit('dataupdate','ok);
    });
});


t.moveRelative("forward",3000);



//function control(d1){
//    t.moveRelative(d1,3000);
//}






