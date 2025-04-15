const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SensorSchema = new Schema({
    type: { type: String, required: true }, // "Temperature"/"Humidity", "PeopleCount", "Motion"
    model: { type: String, required: true }, // "DHT22", "VL53L1X","AS312"
    value: { type: Schema.Types.Mixed, required: true }, // Numeric, Boolean, or String
    unit: { type: String, required: true },  // "°C", "%", "persons", "boolean"(motion sensor) 
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Sensor', SensorSchema);