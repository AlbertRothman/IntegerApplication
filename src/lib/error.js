class Exception extends Error {
  constructor (message, status) {
    super(message);
    this.status = status;
  }
};
class NotFoundException extends Exception {
  constructor (message) {
    super(message, 400);
  }
}
global.Exception = Exception;
global.NotFoundException = NotFoundException;
