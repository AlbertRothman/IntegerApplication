// Dependancies
const express = require('express');
const Auth = require('./controllers/auth');
const IncInt = require('./controllers/incrementing_integer');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const path = require('path');

const key = fs.readFileSync(path.join(__dirname, '../certs/selfsigned.key'));
const cert = fs.readFileSync(path.join(__dirname, '../certs/selfsigned.crt'));
const options = {
  key: key,
  cert: cert
};
// Constants
// TODO: consider factoring out to config
const port = 8000;
const httpsPort = 8001;
// Application
const app = express();
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
const auth = new Auth.Auth(app);
const incInt = new IncInt.IncrementingIntegerController(app);
app.listen(port, () => { console.log(`App listening on port ${port}`); });

const server = https.createServer(options, app);
server.listen(httpsPort, () => {
  console.log(`Https server listening on port ${httpsPort}`);
});
