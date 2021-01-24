// --- index.js ---
// • This is the start (entry-point) of our application.
// • Mongoose is used to make communication with MongoDB easy and simple
// -----------------------------------------------------------------------------
const config = require('../Jazz/server/config/config.json');
const express = require('express')
const path = require('path')
const configController = require('../Jazz/server/controllers/config.controller');

// • Creating Express instance. Later we will use this to declare routes
const app = express()

var http = require('http').Server(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose')

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

    setInterval(function() {
      const rooms =  configController.getRooms().then(result => {
        console.log(result);
      });
      console.log('call');
    }, 20000);

    io.on('connection', async (socket) => {

      // const rooms = await configController.getRooms().then(room => {
      //   socket.join(room);
      // });

      socket.on('subscribe', function(room) { 
        console.log('joining room', room);
        socket.join(room); 
        io.to(room).emit('onListen', 'test ' + room);
      });

      // setTimeout(function() {
      //   io.to('test2').emit('onListen', 'prueba interval test2');
      //  }, 2000);

      //  setTimeout(function() {
      //   io.to('test').emit('onListen', 'prueba interval test1');
      //  }, 4000);
      
      socket.on('unsubscribe', function(room) {  
          console.log('leaving room', room);
          socket.leave(room); 
      });
      
    })

    // • Start listening on port 3000 for requests.
    const PORT = 3000
    // var server = app.listen(PORT, () => console.log(`Application started successfully on port: ${PORT}!`))
    var server = http.listen(3000, () => {
      console.log('server is running on port', server.address().port);
    });

  }
})
