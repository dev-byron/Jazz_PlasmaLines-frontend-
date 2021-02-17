var UserModel = require('../models/user.model');

exports.getAll = async () => {
  var result = [];
  var users = await UserModel.find({}, function (err, users) {
    if (err) throw err;
    return users;
  });
  users.forEach(function (user) {
    result.push({
      id: user._id,
      username: user.username,
      email: user.email
    });
  });
  return result;
};

exports.getByEmail = async (email) => {
  return await UserModel.find(
    {
      email: email
    }, function (err, user) {
      if (err) throw err;
      return {
        id: user._id,
        username: user.username,
        email: user.email
      };
    });
};