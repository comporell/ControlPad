/*CONTROLPAD v0.1 by Trevize Daneel
This is a control script for Beaglebone Black
email: comporell@gmail.com
*/

var b = require('bonescript');
var t = require('./lib/tank.js');

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs= require('fs');
var path = require('path');

app.listen(9090);

function handler(request,response){

	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './index.html';
		
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	
	path.exists(filePath, function(exists) {
	
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});
    
    
}

io.sockets.on('connection',function(socket){
    socket.on('moveRelative',function(data){
        console.log("Socket :" + socket);
        console.log("Request :" + data);
        t.moveRelative(data.direction,data.duration);

        
        //t.moveRelative(data.toLowerCase(),3000);
        
        
        //socket.emit('datastatus','sent');
        //socket.broadcast.emit('dataupdate','ok);
    });
});
console.log("System ON");

t.resetSystem();

//function control(d1){
//    t.moveRelative(d1,3000);
//}






