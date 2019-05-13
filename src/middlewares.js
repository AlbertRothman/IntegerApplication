const { User } = require('./db/models');
const uuidAPIKey = require('uuid-apikey');
async function authorized (req, res, next) {
  console.log(req.headers);
  const uuid = uuidAPIKey.toUUID(req.headers.authorization.split(' ')[1]);
  const users = await User.findAll({ where: {
    apikey: uuid
  } });
  // TODO: handle better
  if (!users.length) {
    res.status(401);
    res.send('fail');
  } else {
    req.userId = users[0].id;
    next();
  }
}

module.exports = {
  authorized
};
