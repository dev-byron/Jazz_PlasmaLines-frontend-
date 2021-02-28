const { config } = require('rxjs');
var PlasmaConfigurationModel = require('../models/plasma-configuration.model');

module.exports = {
    async saveTestModel () {
        saveNewModel();
      return true;
    },
    async getAll() {
        return await PlasmaConfigurationModel.find({}, function(err, result){
            if (err) throw err;
            return result;
        });
    },
    async get(configurationCode) {
        return await PlasmaConfigurationModel.findOne({code: configurationCode}, function(err, result){
            if (err) throw err;
            return result;
        });
    },
    async validConfigurationCode(configurationCode) {
        return await this.get(configurationCode) !== null;
    },
    async saveConfiguration(configuration) {
        if (configuration.code == "") {
            configuration.code = generateCode(6);
            var model = new PlasmaConfigurationModel({
                code: configuration.code,
                viewType: configuration.viewType,
                lineType: configuration.lineType,
                time: configuration.time,
                createdDate: new Date().toISOString(),  
                createdBy: 'bserrano',
                active: true,
                sections: configuration.sections
            });
            model.save(function (err, obj) {
                if (err) throw err;
                return obj;
            });
        }
    },
};

function generateCode(keyLength) {
    var i, key = "", characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (i = 0; i < keyLength; i++) {
        key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
    }
    return key.toUpperCase();
}

//just for testing 
function saveNewModel() {
//   var model = new PlasmaConfigurationModel({
//     code: "AH65RS",
//     viewType: "v",
//     lineType: "a",
//     time: "12:01 PM",
//     createdDate: new Date().toISOString(),
//     sections: [
//         {
//             name: "BOXING",
//             events: [
//                 {
//                     sport: "MU",
//                     division: "MU",
//                     titles: [
//                             "BOXING",
//                             "WTA TENNIS - SPREAD IS FOR SETS",
//                             "ATP TENNIS - GAMES AND TOTAL LINES",
//                             "UFC / MMA"
//                     ]
//                 }
//             ]
//         }
//     ]
//   });

//   model.save(function(err, doc) {
//     if (err) return console.error(err);
//     console.log("Configuration inserted successfully");
//   });

}