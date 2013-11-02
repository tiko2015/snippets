var http = require('http')
  , path = require('path')
  , fs = require('fs');
 
function getFile(filePath,res,page404){
    fs.exists(filePath,function(exists){
        if(exists){
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        } else {
            fs.readFile(page404,function(err,contents){
                if(!err){
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        };
    });
};
function requestHandler(req, res) {
    var fileName = (path.extname(req.url)) ? req.url : path.join(req.url, 'index.html')
      , localFolder = __dirname + '/public'
      , page404 = localFolder + '/404.html';
    getFile(path.join(localFolder, fileName),res,page404);
};
 
http.createServer(requestHandler).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');
