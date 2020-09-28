// Load required packages
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define our event schema
const EventSchema = new Schema({
    event_name: 
        {
            type: String
        },
    description: 
        {
            type: String
        },
    discount: {
        type: String
    },
    venue: {
        type: String
    },
    price : 
        {
            type: Number
        },
    created_at: 
        {
            type: Date,
            default: Date.now
        },
    updated_at: Date
});

module.exports = mongoose.model('Event', EventSchema);
