'use strict';



const express = require('express')
const app = express()
const port = 80
const AWS = require('aws-sdk');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var fs = require('fs');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var s3 = new AWS.S3();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Convert over from API Gateway.. Security issue with credentials, best served token based with IAM.
app.get('upload-to-s3', function (req, res) {
   
   
	 let encodedImage =JSON.parse(event.body).user_avatar;
     let decodedImage = Buffer.from(encodedImage, 'base64');
     
     var filePath = "ml/" + JSON.parse(event.body).username + "/"+ JSON.parse(event.body).filename;
     var params = {
       "Body": decodedImage,
       "Bucket": "s3imageupload",
       "Key": filePath  
    };
    s3.upload(params, function(err, data){
       if(err) {
           callback(err, null);
       } else {
           let response = {
        "statusCode": 200,
        "headers": {
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };
	res.send(response);
})


app.post('/file_upload', upload.single('file'), (req, res, next) => {
	

  var base64 = new Buffer(fs.readFileSync(req.file.path)).toString("base64")
  
  var filename = req.file.originalname;
  
  var username = req.body.username;
  
  
  var options = { method: 'POST',
  url: 'https://v827vdxy7h.execute-api.us-east-1.amazonaws.com/prod/upload-to-s3',
  headers: 
   {'cache-control': 'no-cache' },
	body: '{\n  "user_avatar": "'+base64+'",\n  "username": "'+username+'",\n  "filename": "'+filename+'"\n}' };

		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
					
				return res.redirect(response.statusCode, './?r=true');
			}else{
				res.send(error);
				//return res.redirect(response.statusCode, './');
			}
});
  
  
  
  
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
					
					res.type('image/jpeg');
					res.setHeader('Content-Disposition', 'attachment; filename='+filename);
					res.setHeader('Content-Transfer-Encoding', 'binary');
					res.setHeader('Content-Type', 'image/jpeg');
					res.send(new Buffer(jsonObj.Body.data, 'binary'));
					
					
				}else{
					
					var jsonObj = JSON.parse(body);
					
					//temp check	
					if(jsonObj.message == 'Internal server error'){
						return res.redirect(response.statusCode, './?v=false&fn='+filename);
					}else{
						res.send(error);
					}
					
					
				}
  
});
  

  
  
})

app.get('/', function (req, res) {
   
   var contents = fs.readFileSync(`public${path.sep}index.html`);
	res.send(contents.toString());
})



app.listen(port, () => console.log(`app listening on port ${port}!`))