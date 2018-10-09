'use strict';



const express = require('express')
const app = express()
const port = 80

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



app.post('/file_upload', upload.single('file'), (req, res, next) => {
  // req.file is the `example` file or whatever you have on the `name` attribute: <input type="file" name="example" />
  // I believe it is a `Buffer` object.
  const encoded = req.file.toString('base64')
  console.log(encoded)
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))