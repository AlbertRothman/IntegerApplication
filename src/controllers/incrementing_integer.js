const middlewares = require('../middlewares');
const IncrementingIntegerManager = require('../lib/incrementing_integer');
class IncrementingIntegerController {
  constructor (app) {
    app.get('/v1/current', middlewares.authorized, this.getCurrentInteger);
    app.post('/v1/next', middlewares.authorized, this.incrementInteger);
    app.put('/v1/current', middlewares.authorized, this.setCurrentInteger);
  };

  async incrementInteger (req, res) {
    try {
      const result = await IncrementingIntegerManager.incrementInteger(req);
      res.send(result);
    } catch (e) {
      // only user-defined has status
      if (e.status) {
        res.status(e.status);
        res.send(e.message);
      } else {
        // don't send error message if you don't know what it contains
        res.status(500);
        res.send('Failure while trying to get your next integer');
      }
    }
  };

  async getCurrentInteger (req, res) {
    try {
      const result = await IncrementingIntegerManager.getCurrentInteger(req);
      res.send(result);
    } catch (e) {
      // only user-defined has status
      if (e.status) {
        res.status(e.status);
        res.send(e.message);
      } else {
        // don't send error message if you don't know what it contains
        res.status(500);
        res.send('Failure while trying to get your integer');
      }
    }
  };

  async setCurrentInteger (req, res) {
    try {
      const result = await IncrementingIntegerManager.setCurrentInteger(req);
      res.send(result);
    } catch (e) {
      // only user-defined has status
      if (e.status) {
        res.status(e.status);
        res.send(e.message);
      } else {
        // don't send error message if you don't know what it contains
        res.status(500);
        res.send('Failure while trying to update your integer');
      }
    }
  }
};
module.exports = {
  IncrementingIntegerController
};
