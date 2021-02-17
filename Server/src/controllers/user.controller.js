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
    var response = await service.getByEmail(req.body.email)
    return res.status(200).json(response);
  } catch (e) {
    res.status(500).send({ message: 'Internal Server Error: ' + e.message })
  }
};

exports.save = (req, res) => {
  try {
    //pending to implement
  } catch (e) {
    res.status(500).send({ message: 'Internal Server Error: ' + e.message })
  }
};

exports.update = (req, res) => {
  try {
    //pending to implement
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