# Smart Gym – Embedded System (Raspberry Pi Pico + MicroPython)

This embedded system is part of the **Smart Gym Project**, designed to monitor temperature and humidity, detect motion, count people and control access. It runs on an **Raspberry Pi Pico using MicroPython** and sends sensor data to a remote server via WiFi.

---

## Features

-  Motion detection via PIR sensor
-  Temperature and humidity monitoring via DHT22
-  LED indicator for motion
-  Sends all readings to a web API
-  Planned (but not implemented): people counting (VL53L1X) & NFC access (PN532)

---

## Sensors Overview

### Used

| Sensor     | Description                        |
|------------|------------------------------------|
| **PIR**           | Detects human motion (used to turn LED on/off) |
| **DHT22**         | Measures temperature and humidity |
| **LED**           | Visual indicator for detected motion |

### Planned (Not Fully Integrated)

| Sensor     | Purpose                           | Status               |
|------------|-----------------------------------|----------------------|
| **VL53L1X**| ToF distance sensor for people counting | Code structure present but sensor not tested |
| **PN532**  | NFC for access control            | Code planned but no real card detection done |

---

## Hardware Requirements

- Raspberry Pi Pico
- PIR Sensor
- DHT22 Temperature & Humidity Sensor
- LED
- VL53L1X
- PN532 
- Internet-connected WiFi

---

## How It Works

1. **Startup:**
   - Connects to WiFi.
   - Waits 30 seconds for sensor stabilization.
2. **Motion Detection:**
   - Detects movement using PIR.
   - Confirms it by checking 3 times (to avoid false positives).
   - Turns on LED when motion is detected, and logs it to the API.
   - Turns off LED after 5 minutes of no motion.
3. **Environment Sensing:**
   - Every 3 minutes, reads temperature and humidity from DHT22.
   - Sends both values to the server.
4. **(Optional Features)** – Code present for:
   - People counter (VL53L1X)
   - NFC access control (PN532)

---


