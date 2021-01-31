const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EventSchema = new Schema({
    sport: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: false
    },
    titles: [{
        type: String
    }]
});

module.exports = mongoose.model('EventSchema', EventSchema);