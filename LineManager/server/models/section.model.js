const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SectionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false
    },
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

module.exports = mongoose.model('Section', SectionSchema);