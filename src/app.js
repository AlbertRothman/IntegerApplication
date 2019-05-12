// Dependancies
const express = require('express');
const Auth = require('./controllers/auth');
const bodyParser = require('body-parser');
// Constants
// TODO: consider factoring out to config
const port = 8000;

// Application
const app = express();
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser);
const auth = new Auth.Auth(app);
app.listen(port, () => { console.log(`App listening on port ${port}`); });
