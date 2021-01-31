const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlasmaConfigurationSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    viewType: {
        type: String,
        enum: ['v', 'h'],
        default: 'v',
        required: true,
    },
    lineType: {
        type: String,
        enum: ['a', 'd'], 
        default: 'a',
        required: true
    },
    time: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    sections: [{type: Schema.Types.ObjectId, ref: 'Section'}]
});

// Export the model
module.exports = mongoose.model('PlasmaConfiguration', PlasmaConfigurationSchema);
