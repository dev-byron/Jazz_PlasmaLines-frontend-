// import { Sport } from '../models/sport';

var _ = require('lodash');
const https = require('https');
const parseStringPromise = require('xml2js').parseStringPromise;
const url = "https://affiliates.jazzsports.com/xmlfeed/oanFeed?id_book=15&id_profile=4002&id_line_type=21";

module.exports = {
    get () {
      return xmlToJson(url).then(response => {
        return formatData(response);
      })
      .catch(error => {
        throw error;
      });
    },
};

function formatData(xmlAsJson) {
   var list = [];
   if (xmlAsJson && xmlAsJson.odds[0].schedule) {
        xmlAsJson.odds[0].schedule.forEach(function (schedule){
        list.push({
          sport: schedule.$.sport,
          division: schedule.$.division,
          title: schedule.$.title
        });
      });
   }

  var sports = _.uniqBy(list, 'sport').map(function(obj) { return obj.sport});
  var formattedData = [];
   sports.forEach(function(sportName) {
      var sportModel = {
        sport: sportName,
        divisions: []
      }
      var divisionsBySport = _.uniqBy(_.filter(list, function(schedule) {return schedule.sport == sportName }), 'division').map(function(obj) { return obj.division});
      divisionsBySport.forEach(function(divisionName){
        var divisionModel = {
          name: divisionName,
          titles: []
        };
        var titles = _.filter(list, function(titlesByDivision) { return titlesByDivision.sport == sportName && titlesByDivision.division == divisionName}).map(function(obj) { return obj.title})
        titles.forEach(function(titleName){
          divisionModel.titles.push({
            name: titleName
          });
        });
        sportModel.divisions.push(divisionModel);
      });
      formattedData.push(sportModel);
   });
   return formattedData;
}

function xmlToJson (url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let xml = '';
      res.on('data', (chunk) => {
        xml += chunk;
      });
      res.on('end', () => {
        try {
          parseStringPromise(xml, {explicitRoot: false}).then(function (response){ 
            resolve(response);
          });
        } catch (e) {
          reject(e.message);
        }
      });
    }).on('error', (e) => {
      reject(`Got error: ${e.message}`);
    });
  });
}
