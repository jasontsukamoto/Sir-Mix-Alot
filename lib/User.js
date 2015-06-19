var Model = require('./Model.js');

function User() {
  var UserSchema = {
    username : String,
    password : String
  };
  Model.call(this, UserSchema);
  Model.extend(User);

}
debug('hi');
module.exports = User;

