const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sensor = require('../models/sensorSchema');


/**
 * Fetch all sensor data or filter by sensor type.
 * Example: /sensors?type=Temperature
 */
router.get("/", async (req, res) => {
    try {
        const { type } = req.query; // Extract the "type" query parameter (e.g., Temperature, Humidity, etc.)

        // Build the query object
        let query = {};
        if (type) {
            query.type = type; // Add type filter if provided
        }

        // Fetch data based on the query
        const sensors = await Sensor.find(query);
        res.json(sensors); // Return the data as JSON
    } catch (error) {
        console.error(error.stack); // Log the error stack trace
        return res.status(500).json({ message: error.message }); // Return a 500 error with the error message
    }
});

/**
 * Get the latest environment and occupancy data.
 * Example: /sensors/latest
 */
router.get("/latest", async (req, res) => {
    try {
        // Fetch the latest temperature reading
        const latestTemperature = await Sensor.findOne({ type: "Temperature" }).sort({ timestamp: -1 });
        // Fetch the latest humidity reading
        const latestHumidity = await Sensor.findOne({ type: "Humidity" }).sort({ timestamp: -1 });
        // Fetch the latest people count reading
        const latestPeopleCount = await Sensor.findOne({ type: "PeopleCount" }).sort({ timestamp: -1 });

        // Return the latest data as JSON
        res.json({
            temperature: latestTemperature ? latestTemperature.value : "No data", // Default to "No data" if no reading is found
            humidity: latestHumidity ? latestHumidity.value : "No data",
            peopleCount: latestPeopleCount ? latestPeopleCount.value : 0 // Default to 0 if no reading is found
        });
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: error.message });
    }
});

/**
 * Get historical temperature data (last 1 month).
 * Example: /history/temperature
 */
router.get("/history/temperature", async (req, res) => {
    try {
        const oneMonthAgo = new Date(); // Get the current date
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Subtract 1 month from the current date

        // Fetch temperature data from the last month
        const temperatureHistory = await Sensor.find({ type: "Temperature", timestamp: { $gte: oneMonthAgo } });

        // Return the temperature data as JSON
        res.json(temperatureHistory);
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: error.message });
    }
});

/**
 * Get historical humidity data (last 1 month).
 * Example: /history/humidity
 */
router.get("/history/humidity", async (req, res) => {
    try {
        const oneMonthAgo = new Date(); // Get the current date
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Subtract 1 month from the current date

        // Fetch humidity data from the last month
        const humidityHistory = await Sensor.find({ type: "Humidity", timestamp: { $gte: oneMonthAgo } });

        // Return the humidity data as JSON
        res.json(humidityHistory);
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: error.message });
    }
});

/**
 * Get historical people count data (last 1 month).
 * Example: /history/peoplecount
 */
router.get("/history/peoplecount", async (req, res) => {
    try {
        const oneMonthAgo = new Date(); // Get the current date
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Subtract 1 month from the current date

        // Fetch people count data from the last month
        const peopleCountHistory = await Sensor.find({ type: "PeopleCount", timestamp: { $gte: oneMonthAgo } });

        // Return the people count data as JSON
        res.json(peopleCountHistory);
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: error.message });
    }
});

/**
 * Add new sensor data with light control logic.
 * Example: POST /sensors
 */
router.post("/", async (req, res) => {
    const { type, model, value, unit } = req.body; // Extract fields from the request body

    // Validate required fields
    if (!type || !model || value === undefined || !unit) {
        return res.status(400).json({ message: "All fields (type, model, value, unit) are required." });
    }

    try {
        // Handle motion sensor logic
        if (type === "Motion") {
            const latestPeopleCount = await Sensor.findOne({ type: "PeopleCount" }).sort({ timestamp: -1 });
            if (latestPeopleCount?.value === 0 && value === false) {
                console.log("Turning OFF lights & logging event...");
            } else {
                console.log("Motion detected but people are inside, skipping storage...");
                return res.status(200).json({ message: "Motion event processed but not stored." });
            }
        }

        // Handle PeopleCount logic
        if (type === "PeopleCount") {
            const latestPeopleCount = await Sensor.findOne({ type: "PeopleCount" }).sort({ timestamp: -1 });
            const currentCount = latestPeopleCount ? latestPeopleCount.value : 0; // Default to 0 if no reading is found

            // Update the count based on the new value (+1 for entering, -1 for leaving)
            const newCount = currentCount + value;
            if (newCount < 0) {
                return res.status(400).json({ message: "Invalid people count. Cannot be negative." });
            }

            // Save the updated count to the database
            const newSensor = new Sensor({ type, model, value: newCount, unit });
            await newSensor.save();
            return res.status(201).json(newSensor); // Return the saved document
        }

        // Save data for other sensor types (e.g., temperature, humidity, RFID)
        const newSensor = new Sensor({ type, model, value, unit });
        await newSensor.save();
        res.status(201).json(newSensor); // Return the saved document
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: error.message });
    }
});

/**
 * Delete sensor data by ID.
 * Example: DELETE /sensors/64f1b2c8e4b0a1a2b3c4d5e6
 */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid sensor id format" });
        }

        // Delete the document with the specified ID
        const response = await Sensor.deleteOne({ _id: id });
        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "Sensor data not found" }); // Return 404 if no document was deleted
        }

        res.status(200).json({ message: "Sensor data deleted successfully" }); // Return success message
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: error.message });
    }
});

/**
 * Delete sensor data by date range.
 * Example: DELETE /sensors?startDate=2025-03-22&endDate=2025-03-22
 */
router.delete("/", async (req, res) => {
    try {
        const { startDate, endDate } = req.query; // Extract startDate and endDate from query parameters

        // Validate the date parameters
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Both startDate and endDate are required." });
        }

        // Convert startDate and endDate to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Validate the date format
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
        }

        // Validate that startDate is before endDate
        if (start > end) {
            return res.status(400).json({ message: "startDate must be before endDate." });
        }

        // Set endDate to the end of the day (23:59:59.999)
        end.setHours(23, 59, 59, 999);

        // Log the query for debugging
        console.log("Deleting data between:", start, "and", end);

        // Delete documents within the date range
        const response = await Sensor.deleteMany({
            timestamp: { $gte: start, $lte: end } // $gte: greater than or equal, $lte: less than or equal
        });

        // Log the response for debugging
        console.log("Delete response:", response);

        // Check if any documents were deleted
        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "No sensor data found within the specified date range." });
        }

        // Return success message
        res.status(200).json({ message: `Deleted ${response.deletedCount} sensor data records between ${startDate} and ${endDate}.` });
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: error.message });
    }
});

/**
 * Update sensor data by ID.
 * Example: PUT /sensors/64f1b2c8e4b0a1a2b3c4d5e6
 */
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid sensor id format" });
        }

        // Update the document with the specified ID
        const response = await Sensor.findByIdAndUpdate(id, req.body, { new: true });
        if (!response) {
            return res.status(404).json({ message: "Sensor data not found" }); // Return 404 if no document was found
        }

        res.status(200).json(response); // Return the updated document
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;