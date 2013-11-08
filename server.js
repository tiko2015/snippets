var http = require('http')
  , path = require('path')
  , fs   = require('fs')
  , jade = require('jade')
  , less = require('less')
  , jsonlint = require('jsonlint');
  
function getFile(filePath,res,page404){
  fs.exists(filePath,function(exists){
    if(exists){
      fs.readFile(filePath,function(err,contents){
        if (err) return appError(err, res);   
        res.end(contents);
        //console.log('res: ' + filePath);
      });
    } else {
      fs.readFile(page404,function(err,contents){
        if (err) return appError(err, res);   
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(contents);
      });
    };
  });
};
function requestHandler(req, res) {
  //console.log('req: ' + req.url);
  var fileName      = (path.extname(req.url)) ? req.url : path.join(req.url, 'index.html')
    , tplFolder     = './views'
    , lessFolder    = './less'
    , dataFolder    = './models'
    , localFolder   = './public'
    , page404       = localFolder + '/404.html'
    , jadeFileName  = path.join(tplFolder, fileName) + '.jade'
    , lessFileName  = path.join(lessFolder, fileName) + '.less'
    , jsonFileName  = path.join(dataFolder, fileName) + '.json';

  var loadJade = function (exists) {
    if(exists){
      fs.exists( jsonFileName , loadJson);
    } else {
      getFile(path.join(localFolder, fileName),res,page404);        
    }
  };

  var loadLess = function (exists) {
    if(exists){
      fs.readFile(lessFileName, 'utf8', function (err, data) {
        if (err) return appError(err, res);   
        less.render(data, { compress: true, paths: ['./less'] }, function (err, css) {
          if (err) return appError(err, res);   
          res.setHeader("Content-type", "text/css; charset=utf-8");
          res.end(css);
          console.log('res: ' + lessFileName);
          console.log('res: ' + localFolder + fileName);
          fs.writeFile(localFolder + fileName, css, function (err) {
            if (err) throw err;
            console.log(localFolder + fileName + ' saved!');
          });
        });
      });
    }
  };
  
  var loadJson = function(exists){
    if(exists){
      fs.readFile(jsonFileName, 'utf8', function (err, data) {
        if (err) return appError(err, res);   
        try {
          options = jsonlint.parse(data);
          renderJade(options);
        } catch (err) {
            err.file = jsonFileName;
            return appError(err, res);   
        }
        console.log('res: ' + jsonFileName);
      });
    } else {  
      options = {};
      renderJade(options);
    }
  };
  var renderJade = function() {
    fs.readFile('./models/_config.json', 'utf8', function (err, configFile) {
      if (err) return appError(err, res);   
      try {  
        var config = jsonlint.parse(configFile);
        jade.renderFile(jadeFileName, { content:options, config:config }, function (err, html) {
          if (err) return appError(err, res);   
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
          console.log('res: ' + jadeFileName);
          console.log('res: ' + localFolder + fileName);
          fs.writeFile(localFolder + fileName, html, function (err) {
            if (err) throw err;
            console.log(localFolder + fileName + ' saved!');
          });
        });
      } catch (err) {
          err.file = 'models/_config.json';
          return appError(err, res);   
      }
    });
  };
  if(path.extname(req.url) != '.css') fs.exists( jadeFileName , loadJade);
  else fs.exists( lessFileName , loadLess);
};

function appError(err, res) {
  console.log('ERROR:');
  console.log(err);
  res.writeHead(500, {"Content-Type": "text/plain"});
  res.write('ERROR:\n\n');
  if(err.file) res.write('FILE:'+err.file+'\n\n');
  res.write(err.message);
  res.end();
}
var port = process.env.PORT || 5000;
http.createServer(requestHandler).listen(port);
console.log('Server running in port:' + port );
