const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LineSchema = new Schema({
    sport: { type: String },
    division: { type: String },
    description: { type: String },
});

// Export the model
module.exports = mongoose.model('Line', LineSchema);