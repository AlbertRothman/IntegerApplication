const { User } = require('../db/models/');
const uuidAPIKey = require('uuid-apikey');
class UserManager {
  async createUser (req) {
    const email = req.body.email;
    const password = req.body.password;
    const apikey = uuidAPIKey.create();
    await User.create({ email, password, apikey: apikey.uuid });
    return apikey.apiKey;
  }
};

module.exports = new UserManager();
