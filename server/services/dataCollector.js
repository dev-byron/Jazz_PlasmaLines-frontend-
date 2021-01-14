var parseString = require('xml2js').parseString;
var http = require('http');

    
// xmlToJson(url, function(err, data) {
//     if (err) {
//         return console.err(err);
//     }
//     // print object to see if it works
//     console.log(JSON.stringify(data, null, 2));
// });


function xmlToJson(callback) {
    var url = "https://affiliates.jazzsports.com/xmlfeed/oanFeed?id_book=15&id_profile=4002&id_line_type=21";
    var req = http.get(url, function(res) {
      var xml = '';
      
      res.on('data', function(chunk) {
        xml += chunk;
      });
  
      res.on('error', function(e) {
        callback(e, null);
      }); 
  
      res.on('timeout', function(e) {
        callback(e, null);
      }); 
  
      res.on('end', function() {
        parseString(xml, function(err, result) {
          callback(null, result);
        });
      });
    });
  }

