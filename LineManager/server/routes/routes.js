const PlasmaLinesSchema = require('../../repo/repository')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/config.controller');
const lineContronller = require('../controllers/line.controller');


// • declaring routes
router.get('/loadLines', lineContronller.loadLines);



// • Export router to use it on other modules
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
