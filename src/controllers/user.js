const UserManger = require('../lib/user');
class User {
  constructor (app) {
    app.post('/createAccount', this.createAccount);
  };

  async createAccount (req, res) {
    try {
      const result = await UserManger.createUser(req);
      res.send(result);
    } catch (e) {
      if (e.status) {
        res.status(e.status);
        res.send(e.message);
      } else {
        // don't send error message if you don't know what it contains
        res.status(500);
        res.send('Failure while trying create you account');
      }
    }
  };
};
module.exports = {
  User
};
