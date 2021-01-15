
const parseString = require('xml2js').parseString;
const https = require('https');

const url = "https://affiliates.jazzsports.com/xmlfeed/oanFeed?id_book=15&id_profile=4002&id_line_type=21";

module.exports = {
    get(req, res) {
      return xmlToJson(url, function(err, data) {
          if (err) {
              return res.send(err);
          }
          // console.log(JSON.stringify(data.xml.odds[0].schedule[0], null, 2));
          formatData(data.xml);
          return res.send(data);
        });
    },
};

//improve this with objects
function formatData(xmlAsJson, callback) {
   var list = [];
   if (xmlAsJson && xmlAsJson.odds[0].schedule) {
      xmlAsJson.odds[0].schedule.forEach(function (schedule){
        list.push({
          sport: schedule.sport,
          division: schedule.division,
          title: schedule.title
        });
      });
      console.log(JSON.stringify(list));
   }
}

function xmlToJson(url, callback) {
    var req = https.get(url, function(res) {
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