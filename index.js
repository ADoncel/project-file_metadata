var express = require('express');
var cors = require('cors');
require('dotenv').config()
const bodyParser = require("body-parser");
var app = express();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let file = req.file;

  let ret = {
    name: file.originalname,
    size: file.size,
    type: file.mimetype
  }

  res.json(ret);
})

app.use(function(err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
});
app.use(function(req, res) {
  if (req.method.toLowerCase() === "options") {
    res.end();
  } else {
    res.status(404).type("txt").send("Not Found");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
