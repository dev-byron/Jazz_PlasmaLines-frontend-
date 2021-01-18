const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConfigurationSchema = new Schema({
    lastRetrievedData: { type: Date }
});

// Export the model
module.exports = mongoose.model('Configuration', ConfigurationSchema);