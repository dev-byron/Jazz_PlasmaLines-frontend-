var service = require('../services/user.service');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getAll = async (req, res) => {
  try {
    var response = await service.getAll();
    return res.status(200).json(response);
  } catch (e) {
    res.status(500).send({ message: 'Internal Server Error: ' + e.message })
  }
};

exports.getByEmail = async (req, res) => {
  try {
    var user = null;
    var response = await service.getByEmail(req.params.email);
    if (response) {
      user = {
        username: response.username,
        email: response.email
      };
    }
    return res.status(200).json(user);
  } catch (e) {
    res.status(500).send({ message: 'Internal Server Error: ' + e.message })
  }
};

exports.save = async (req, res) => {
  try {
    var response = await service.save(req, res);
    return res.status(200).json(response);
  } catch (e) {
    res.status(500).send({ message: 'Internal Server Error: ' + e.message })
  }
};


exports.delete = (req, res) => {
  try {
    //pending to implement
  } catch (e) {
    res.status(500).send({ message: 'Internal Server Error: ' + e.message })
  }
};