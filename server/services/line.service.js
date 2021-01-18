const LineModel = require('../models/line.model');
const XmlClient = require('../client/xmlClient');
const config = require('../config/config.json');

module.exports = {
    refreshLines() {
        return XmlClient.get(config.jazzsportsFeedUrl).then(response => {
            var linesFormatted = formatXmlLines(response);
            saveLines(linesFormatted);
            return linesFormatted;
        })
            .catch(error => {
                throw error;
            });
    },
    get(lineId) {

    },
    getAll() {
        return LineModel.getAll();
    }
};

function saveLines(linesList) {
    linesList.forEach(function (line) {
        var model = new LineModel(
            {
                sport: line.sport,
                division: line.division,
                description: line.description,
            }
        );
        model.save(function (err) {
            if (err) {
                throw err;
            }
        })
    });
}

function formatXmlLines(xmlAsJson) {
    var list = getSchedulesList(xmlAsJson);
    //var formattedData = getSports(list);
    return list;
}

function getSchedulesList(xmlAsJson) {
    var scheduleList = [];
    if (xmlAsJson && xmlAsJson.odds[0].schedule) {
        xmlAsJson.odds[0].schedule.forEach(function (schedule) {
            var model = {
                sport: schedule.$.sport,
                division: schedule.$.division,
                description: schedule.$.title
            };
            scheduleList.push(model);
        });
    }
    return scheduleList;
}

function getSports(list) {
    var sports = [];
    var sportsList = _.uniqBy(list, 'sport').map(function (obj) { return obj.sport });
    sportsList.forEach(function (sportName) {
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
    var divisionsBySport = _.uniqBy(_.filter(list, function (schedule) { return schedule.sport == sportName }), 'division')
    .map(function (obj) { return obj.division });
    divisionsBySport.forEach(function (divisionName) {
        var divisionModel = {
            name: divisionName,
            titles: []
        };
        divisionModel.titles = getDescriptionsByDivision(list, sportName, divisionName);
        divisions.push(divisionModel);
    });
    return divisions;
}

function getDescriptionsByDivision(list, sportName, divisionName) {
    var titles = [];
    var titlesByDivision = _.filter(list, function (schedule) { return schedule.sport == sportName && schedule.division == divisionName })
        .map(function (obj) { return obj.title });
    titlesByDivision.forEach(function (titleName) {
        titles.push({
            name: titleName
        });
    });
    return titles;
}