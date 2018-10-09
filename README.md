Welcome to the ML Review sample web application
==================================================

This sample application uses simple Node.js  UI and web service api's deployed by AWS CloudFormation to AWS Lambda and Amazon API Gateway.

What's Here
-----------

This sample includes:

* README.md - this file
* buildspec.yml - this file is used by AWS CodeBuild to package your
  application for deployment to AWS Lambda
* index.js - Main server file. All code for all routes contaiined within
* template.yml - this file contains the AWS Serverless Application Model (AWS SAM) used
  by AWS CloudFormation to deploy your application to AWS Lambda and Amazon API
  Gateway.
* tests/ - this directory contains unit tests for your application

____________________________________________________________


The application consist of two parts.

1. API Gateway hosted HTTP endpoints


A) https://v827vdxy7h.execute-api.us-east-1.amazonaws.com/prod/upload-to-s3

 The "upload-to-s3" endpoint takes in a JSON formatted string in the body.
--------------------------------------------------------------------------------

{
  "user_avatar": "{BASE64 Encoded}",
  "username": "postmon",
  "filename": "sonofman.jpg"
}

--------------------------------------------------------------------------------



B) https://v827vdxy7h.execute-api.us-east-1.amazonaws.com/prod/get-image

The "get-image" endpoint retrives an image based on URL parameters

--------------------------------------------------------------------------------

prod/get-image?key=postmon&fn=sonofman.jpg

--------------------------------------------------------------------------------