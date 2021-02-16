var PlasmaConfigurationModel = require('../models/plasma-configuration.model');

module.exports = {
    async save () {
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
    }
};

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