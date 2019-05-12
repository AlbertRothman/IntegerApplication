const { User } = require('../db/models/');
const uuidAPIKey = require('uuid-apikey');

class Auth {
  constructor (app) {
    app.post('/createAccount', this.createAccount);
  };

  createAccount (req, res) {
    // TODO: handle missing elements in req.body
    // TODO: move business logic
    const email = req.body.email;
    const password = req.body.password;
    const apikey = uuidAPIKey.create();
    User.create({ email, password, apikey: apikey.uuid });
    res.send(apikey.apiKey);
  };
};
module.exports = {
  Auth
};
