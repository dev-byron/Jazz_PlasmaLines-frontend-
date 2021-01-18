// --- index.js ---
// • This is the start (entry-point) of our application.
// • Mongoose is used to make communication with MongoDB easy and simple
// -----------------------------------------------------------------------------
const ws = require('ws');
const config = require('../Jazz/server/config/config.json');
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')


// • Creating Express instance. Later we will use this to declare routes
const app = express()

// • Connect to MongoDB database. Please be sure you have started MongoDB
// services before running application and replace `example-app` with your
// database's name.
mongoose.connect(config.mongoConnectionString, (err) => {
  if (err) {
    // We want to log if app can not connect to database
    console.log(err)
  } else { // If there is no error during db connection, continue proccess 

    // • `/dist` is default file output of ng build command. You can change
    // that on `angular-cli.json` config file but don't forget to change below line
    // too or server will not be able to locate our front-end part of application.
    app.use(express.static(path.join(__dirname, 'dist')))

    // • This is a special method called `middleware`. Every request will be
    // executed on each request. If you want to exclude a specific route to make it
    // not enter on this middleware, simply declare that route before this function
    app.use('/', function (req, res, next) {
      // • Implement your logic here.
      console.log('Time:', Date.now())
      next()
    })

    // • We call use() on the Express application to add the Router to handle path,
    // specifying an URL path on first parameter '/api/example'.
    app.use('/api', require('./server/routes/routes'))

    // • Every other route not declared above will redirect us to Angular view
    // called `index.html`. Be sure you have builded and created output files from
    // angular app.
    app.get('*', (req, res) => {
      console.log(req.url)
      res.sendFile(path.join(__dirname, 'dist/index.html'))
    })

    // • Start listening on port 3000 for requests.
    const PORT = 3000
    var server = app.listen(PORT, () => console.log(`Application started successfully on port: ${PORT}!`))

    // • Creating and opening web socket
    const wsServer = new ws.Server({ server });
    wsServer.on('connection', socket => {
      socket.on('message', message => {
        console.log('received: %s', message);
        socket.send(JSON.stringify({
          content: 'test' + message.clientMessage
        }));
      });
    });

  }
})
