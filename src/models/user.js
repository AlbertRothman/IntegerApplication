const connection = require('..db/connection');
const uuidAPIKey = require('uuid-apikey');
class User {
  create () {
    connection.create({});
  }
}
module.exports = { User: User() };
