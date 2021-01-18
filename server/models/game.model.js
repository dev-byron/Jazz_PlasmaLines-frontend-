const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GameSchema = new Schema({
    
});

// Export the model
module.exports = mongoose.model('Game', GameSchema);