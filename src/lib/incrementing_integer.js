const { IncrementingInteger } = require('../db/models/');
class IncrementingIntegerManger {
  async incrementInteger (req) {
    let result = await IncrementingInteger.findOrCreate({ where: { userId: req.userId } });
    if (result[1]) {
      return result[0];
    } else {
      result = await IncrementingInteger.update({ userInt: parseInt(result[0].userInt) + 1 }, { where: { id: result[0].id }, returning: true });
      return result[1];
    }
  }

  async getCurrentInteger (req) {
    const result = await IncrementingInteger.findOne({ where: { userId: req.userId } });
    if (result) {
      return result;
    } else {
      // eslint-disable-next-line no-undef
      throw new NotFoundException('No Integers found for this user! Try initializing your integer to a specific value, or calling the next endpoint!');
    }
  }

  async setCurrentInteger (req) {
    const newValue = req.body.current;
    let result = await IncrementingInteger.findOne({ where: { userId: req.userId } });
    if (result) {
      result = await IncrementingInteger.update({ userInt: newValue }, { where: { id: result.id }, returning: true });
      result = result[1][0];
    } else {
      result = await IncrementingInteger.create({ userInt: newValue, userId: req.userId }, { returning: true });
    }
    return result;
  }
}
module.exports = new IncrementingIntegerManger();
