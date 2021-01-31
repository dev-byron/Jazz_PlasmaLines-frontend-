var PlasmaConfigurationModel = require('../models/plasma-configuration.model');

module.exports = {
    async save () {
        saveNewModel();
      return true;
    },
};

function saveNewModel() {
  var model = new PlasmaConfigurationModel({
      
  });
  model.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Configuration inserted successfully");
  });
}


