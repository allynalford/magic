'use strict';



const express = require('express')
const app = express()
const port = 80

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var fs = require('fs');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/file_upload', upload.single('file'), (req, res, next) => {
	
  const encoded = req.file.toString('base64');
  
  var filename = req.file.originalname;
  var username = req.body.username;
  
  
  request.post(
    'https://v827vdxy7h.execute-api.us-east-1.amazonaws.com/prod/upload-to-s3',
    { json: { username: username, filename: filename, user_avatar: encoded} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
				
			return res.redirect(response.statusCode, './?r=true');
        }else{
			res.send(error);
			//return res.redirect(response.statusCode, './');
		}
    }
)
  
  
  
})

app.post('/file_view', urlencodedParser, function(req, res) {

	
  
  var filename = req.body.filename;
  var username = req.body.username;
  
  
  var options = { method: 'GET',
  url: 'https://v827vdxy7h.execute-api.us-east-1.amazonaws.com/prod/get-image',
  qs: { key: username, fn: filename },
  headers: 
   { 'cache-control': 'no-cache' } };

		request(options, function (error, response, body) {
			
		  if (!error && response.statusCode == 200) {
			  
					var jsonObj = JSON.parse(body);
					
						//res.send(body);
						
					
					
					res.contentType('image/jpeg');
					res.status('200').send(jsonObj.Body.data, 'binary');
					
					
				}else{
					
					res.send(error);
				
				}

	
  
  
  
  
 
  
});
  

  
  
  
})

app.get('/', function (req, res) {
   //res.sendFile('./public/index.html');
   //res.sendFile(path.join(__dirname + '/index.html'));
   
   var contents = fs.readFileSync(`public${path.sep}index.html`);
	res.send(contents.toString());
})



app.listen(port, () => console.log(`app listening on port ${port}!`))