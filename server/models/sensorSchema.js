const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const SensorSchema = new Schema({
    type: {
        type: String,
        enum: [ 'Temperature', 'Humidity', 'PeopleCount', 'Motion'],
        required: true,
    },
    model: {
        type: String,
        enum: [ 'DHT22', 'VL53L1X','AS312' ],
        required: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: true,
        validate: {
            validator: (val) => {
                return typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean';
            },
            message: props => `Invalid sensor value: ${props.value}`
        }
    }, // Numeric, Boolean, or String
    unit: {
        type: String,
        enum: ['°C', '%', 'persons', 'boolean'],
        required: true 
    }
}, {timestamps: true});


module.exports = mongoose.model('Sensor', SensorSchema);