const AWS = require('aws-sdk');
//*/ get reference to S3 client 
var s3 = new AWS.S3();
exports.handler = (event, context, callback) => {
    
    
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
            "my_header": "my_value"
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };
           callback(null, response);
    }
    });
    
};

