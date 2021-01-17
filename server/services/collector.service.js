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
   var list = getCleanList(xmlAsJson);
  var formattedData = getSports(list);
   return formattedData;
}

function getCleanList(xmlAsJson){
  var cleanList = [];
  if (xmlAsJson && xmlAsJson.odds[0].schedule) {
      xmlAsJson.odds[0].schedule.forEach(function (schedule){
        cleanList.push({
        sport: schedule.$.sport,
        division: schedule.$.division,
        title: schedule.$.title
      });
    });
  }
  return cleanList;
}

function getSports(list){
  var sports = [];
  var sportsList = _.uniqBy(list, 'sport').map(function(obj) { return obj.sport});
  sportsList.forEach(function(sportName) {
    var sportModel = {
      sport: sportName,
      divisions: []
    }
    sportModel.divisions = getDivisionsBySport(list, sportName);
    sports.push(sportModel);
 });
 return sports;
}

function getDivisionsBySport(list, sportName) {
  var divisions = [];
  var divisionsBySport = _.uniqBy(_.filter(list, function(schedule) {return schedule.sport == sportName }), 'division').map(function(obj) { return obj.division});
  divisionsBySport.forEach(function(divisionName){
    var divisionModel = {
      name: divisionName,
      titles: []
    };
    divisionModel.titles = getTitlesByDivision(list, sportName, divisionName);
    divisions.push(divisionModel);
  });
  return divisions;
}

function getTitlesByDivision(list, sportName, divisionName) {
  var titles = [];
  var titlesByDivision = _.filter(list, function(schedule) { return schedule.sport == sportName && schedule.division == divisionName})
                          .map(function(obj) { return obj.title});
  titlesByDivision.forEach(function(titleName){
    titles.push({
      name: titleName
    });
  });
  return titles;
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
