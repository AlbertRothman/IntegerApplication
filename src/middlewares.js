const { User } = require('./db/models');
const uuidAPIKey = require('uuid-apikey');
async function authorized (req, res, next) {
  try {
    const uuid = uuidAPIKey.toUUID(req.headers.authorization.split(' ')[1]);
    const users = await User.findAll({ where: {
      apikey: uuid
    } });
    if (!users.length) {
      res.status(401);
      res.send('fail');
    } else {
      req.userId = users[0].id;
      next();
    }
  } catch (e) {
    res.status(500);
    res.send('Malformed request');
  }
}

module.exports = {
  authorized
};
