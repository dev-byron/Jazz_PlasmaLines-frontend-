const express = require('express')
const router = express.Router()
const controller = require('../controllers/config.controller');
const lineContronller = require('../controllers/lines.controller');
const configController = require('../controllers/configuration.controller');

// • declaring routes
router.get('/loadLines', lineContronller.loadLines);

//configuration
router.post('/configuration', configController.save);
router.get('/configuration/:code', (req, res) => {
  return configController.get(req, res);
});
router.get('/configuration/', (req, res) => {
  return configController.getAll(req, res);
});
router.get('/configuration/:code/isValid', (req, res) => {
  return configController.validConfigurationCode(req, res);
});

module.exports = router

// // • Declaring POST method
// router.post('/', function (req, res) {
//   // • Create and save `example` on MongoDB.
//   // • We get information form request body
//   PlasmaLinesSchema.create({
//     title: req.body.title,
//     content: req.body.content
//   }, function (err, examples) {
//     if (err) { res.send(err) }

//     // • Get and return all the `examples` after you create another
//     PlasmaLinesSchema.find(function (err, examples) {
//       if (err) { res.send(err) }
//       res.json(examples)
//     })
//   })
// })

// // • declaring routes
// router.get('/collector', controller.get);

// // • Declaring GET method
// router.get('/', function (req, res) {
//   // • Use mongoose to get all `examples` in our database
//   // • How we got this find() method you'll ask? Well, that comes from our
//   // declared mongoose model.
//   PlasmaLinesSchema.find(function (err, examples) {
//     // • If there is an error, send the error. nothing after res.send(err)
//     // will execute
//     if (err) { res.send(err) }

//     // • Return all `examples` in JSON format
//     res.json(examples) // return all examples in JSON format
//   })
// })
