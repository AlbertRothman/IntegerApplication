const { IncrementingInteger } = require('../db/models/');
const middlewares = require('../middlewares');
// const uuidAPIKey = require('uuid-apikey');
class IncrementingIntegerController {
  constructor (app) {
    app.get('/v1/current', middlewares.authorized, this.getCurrentInteger);
    app.post('/v1/next', middlewares.authorized, this.incrementInteger);
    app.put('/v1/current', middlewares.authorized, this.setCurrentInteger);
  };

  async incrementInteger (req, res) {
    // TODO: handle missing elements in req.body
    // TODO: move business logic
    try {
      let result = await IncrementingInteger.findOrCreate({ where: { userId: req.userId } });
      if (result[1]) {
        res.send(result);
      } else {
        result = await IncrementingInteger.update({ userInt: parseInt(result[0].userInt) + 1 }, { where: { id: result[0].id }, returning: true });
        res.send(result[1]);
      }
    } catch (e) {
      res.status(500);
      res.send('Failure while trying to update the next integer');
    }
  };

  async getCurrentInteger (req, res) {
    try {
      const result = await IncrementingInteger.findOne({ where: { userId: req.userId } });
      if (result) {
        res.send(result);
      } else {
        res.status(400);
        res.send('No Integers found for this user! Try initializing your integer to a specific value, or calling the next endpoint!');
      }
    } catch (e) {
      res.status(500);
      res.send('Failure while trying to get your integer');
    }
  };

  async setCurrentInteger (req, res) {
    const newValue = req.body.current;
    try {
      let result = await IncrementingInteger.findOne({ where: { userId: req.userId } });
      if (result) {
        result = await IncrementingInteger.update({ userInt: newValue }, { where: { id: result.id }, returning: true });
        result = result[1][0];
      } else {
        result = await IncrementingInteger.create({ userInt: newValue, userId: req.userId }, { returning: true });
      }
      res.send(result);
    } catch (e) {
      console.log(e);
      res.status(500);
      res.send('Error when trying to update integer value');
    }
  }
};
module.exports = {
  IncrementingIntegerController
};
