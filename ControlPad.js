/*CONTROLPAD v0.1 by Trevize Daneel
This is a control script for Beaglebone Black
*/

var b = require('bonescript');
var t = require('./lib/tank.js');
var exec = require('child_process').exec;

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
		case '.jpg':
		    contentType = "image/jpeg";
		    break;
	}
	console.log("Serving file:" + filePath + " (" + contentType +")" );
	
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
    
    socket.on('rotateHead',function(data){
        console.log("Socket :" + socket);
        console.log("Request :" + data);
        t.headRotate(data.angle);
        socket.emit('datastatus',"Current angle: " + data.angle);
        //socket.broadcast.emit('dataupdate','ok);
    });
    socket.on('rotateHead2',function(data){
        console.log("Socket :" + socket);
        console.log("Request :" + data);
        t.headRotate2(data.angle);
        socket.emit('datastatus',"Current angle: " + data.angle);
        //socket.broadcast.emit('dataupdate','ok);
    });
    socket.on('capture',function(data){
        exec('capturewebcam', function callback(error, stdout, stderr){
            console.log("Error: "+error);
            socket.emit('capturestatus','1');
        });
        
        getTheNewImage(function(data,size){
            socket.emit('firstChunkSent', data, size)
        });
        
    });
});

function getTheNewImage(callback){
  var filename = 'capture.jpg';
  var base64FileSize  = fs.stat(filename,function(err,stats){
    if (err) { throw err; }
    //return stats.size
    callback(null,stats.size);
  });

  var readable = fs.createReadStream(filename, { encoding: 'base64' });
  
  readable.on('readable', function() {
    var getImageData = function(){
      while (null !== (base64ImageData = readable.read())) {
      return base64ImageData
      }
    }
    
    callback(getImageData(),base64FileSize)
  });

  readable.on('end', function() {
    console.log('there will be no more data.')
  });

  readable.on('error', function(err) {
    console.log('here is the error: '+err)
    readable.end(err);
  });
}
    console.log("System ON...");
    t.resetSystem();
    exec('capturewebcam', function callback(error, stdout, stderr){
        console.log("Error: "+error);
    });
    console.log("System Ready...");
        
//function control(d1){
//    t.moveRelative(d1,3000);
//}


