'use strict';



const express = require('express')
const app = express()
const port = 80

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var fs = require('fs');
var path = require('path');
var request = require('request');

app.post('/file_upload', upload.single('file'), (req, res, next) => {
  // req.file is the `example` file or whatever you have on the `name` attribute: <input type="file" name="example" />
  // I believe it is a `Buffer` object.
  const encoded = req.file.toString('base64');
  
  var filename = req.file.originalname;
  var username = req.body.username;
  
  
  request.post(
    'https://v827vdxy7h.execute-api.us-east-1.amazonaws.com/prod/upload-to-s3',
    { json: { username: username, filename: filename, user_avatar: encoded} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
			
			res.send('File ' + filename +' Uploaded to ML/' + username + '/')
        }else{
			res.send(error)
		}
    }
)
  
  
  
})



app.get('/', function (req, res) {
   //res.sendFile('./public/index.html');
   //res.sendFile(path.join(__dirname + '/index.html'));
   
   var contents = fs.readFileSync(`public${path.sep}index.html`);
	res.send(contents.toString());
})



app.listen(port, () => console.log(`app listening on port ${port}!`))