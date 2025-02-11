# Group-M

## Group Members
- Kattarin Chaisutthisunthon
- Arch Promchan
- Puripan Leelapong-Anan
- Oumaima Oubihi
- Md Rakibuzzaman Rakib

---

# **Project Title**  
**Smart Gym IoT System**

---

## **Project Overview**  
The **Smart Gym IoT System** is designed to improve the gym experience by using IoT technology to monitor environmental conditions, track gym occupancy, and automate lighting. A **Raspberry Pi Pico** will collect data from various sensors to display **temperature, humidity, and real-time gym occupancy**. An **RFID/NFC key system** will recognize users, and a **sensor-based system** will accurately count the number of people entering. The system will also include **smart lighting control**, ensuring that lights turn on when people are detected and switch off when the gym is empty. Some additional features may also be implemented.

---

## **Project Requirements & System Design**

### **1. Project Requirements**
The system must achieve the following functionalities:
- **Real-time environmental monitoring**: Display temperature and humidity.
- **User identification**: Authenticate gym members using RFID/NFC key tags.
- **People counting**: Accurately track the number of individuals entering using a ToF sensor.
- **Automated lighting**: Turn lights on/off based on motion detection.
- **Secure data handling**: Ensure encrypted data transmission and user authentication.
- **Web UI integration**: Provide real-time data access for gym administrators.

### **2. Sensor Selection**
After research, the following sensors were chosen:
| **Sensor Type** | **Model** | **Purpose** |
|---------------|---------|------------|
| Temperature & Humidity | DHT22 | Monitor gym environment |
| People Counting | VL53L1X (ToF Sensor) | Track gym occupancy accurately |
| Motion Detection | AS312 (PIR) | Automate lighting based on movement |
| User Authentication | PN532 + NXP MIFARE Classic (RFID Reader + Card) | Identify gym members with key tags |

### **Links to the Sensors:**
**Humidity and Temrature** - DHT22: 
- https://fi.farnell.com/en-FI/dfrobot/sen0137/temp-humidity-sensor-arduino-brd/dp/3517874

**People Counting** - VL53L1X (ToF Sensor): 
- https://fi.farnell.com/en-FI/stmicroelectronics/vl53l1x-satel/breakout-board-tof-proximity-sensor/dp/2980975

**Motion Detection** - AS312 (PIR): 
- https://www.elfadistrelec.fi/fi/as312-m5stickc-pir-anturihattu-m5stack-u054/p/30180767?trackQuery=PIR%20sensor&pos=5&origPos=5&origPageSize=50&track=true&sid=Nv0SPa5dWX&itemList=search

**User Authentication** - PN532 + NXP MIFARE Classic (RFID reader + Card): 
- https://fi.farnell.com/en-FI/adafruit/789/silicon-manufacturer/dp/2816376
- https://fi.farnell.com/en-FI/nxp/mf1s7030xda4-v1j/rfid-reader-writer-13-56mhz-4kb/dp/2820254

### **3. System Architecture**
- **Sensors → Raspberry Pi Pico (Data Processing) → Database → Web UI**
- **Data Flow:**
  1. Sensors collect data.
  2. Raspberry Pi Pico processes and transmits data via MQTT/HTTP.
  3. Data is stored in an InfluxDB or Firebase database.
  4. Web UI fetches and visualizes real-time data.
- **Communication Protocols:**
  - **MQTT** for real-time sensor updates.
  - **HTTP/WebSockets** for dashboard communication.

### **4. Security Measures**
- **Data Encryption:** Secure MQTT/HTTP communication.
- **User Authentication:** Only authorized members can access gym facilities.
- **Database Security:** Prevent unauthorized access to stored data.

### **5. Energy Efficiency Measures**
- **Optimized Lighting Control:** PIR sensors reduce unnecessary power usage.
- **Efficient Data Processing:** Reducing redundant communication saves power.
- **Low-Power Hardware:** Using energy-efficient sensors minimizes power consumption.

### **6. Database Design & Implementation**
- **Users Table**: Stores user information (ID, name, key tag ID).
- **Sensor Data Table**: Logs temperature, humidity, and occupancy status.
- **Gym Occupancy Table**: Tracks real-time count of gym members inside.
- **Implementation:** Database hosted on InfluxDB.

---

## **Milestones**  
- **Milestone 1:** Research & Requirement Analysis – Due by **4/2/2025**  
- **Milestone 2:** Hardware & Software Setup – Due by **25/2/2025**  
- **Milestone 3:** Data Processing & Display Implementation – Due by **5/4/2025**  
- **Milestone 4:** Testing & Optimization – Due by **10/4/2025**  
- **Final Submission:** **15/4/2025**

---

## **Roles and Responsibilities**  
| **Team Member** | **Role**       | **Responsibilities**          |  
|------------------|----------------|--------------------------------|  
| Kattarin Chaisutthisunthon  | Front-end Developer | Design and implement the UI for real-time data display  |  
| Arch Promchan               | Front-end Developer | Assist with UI design and optimization  |  
| Puripan Leelapong-Anan      | Embedded Systems Engineer | Integrate and configure sensors with Raspberry Pi Pico  |  
| Oumaima Oubihi              | Embedded Systems Engineer | Work on sensor communication and data handling  |  
| Md Rakibuzzaman Rakib       | Backend & Project Manager | Develop backend logic and oversee project execution  |  

---

## **Tools for Communication**  
- **Messaging & Collaboration:** WhatsApp, Discord, Trello  
- **Documentation:** Google Docs, Canva  
- **Version Control:** GitHub  

---

## **Development Setup**  
The following tools and software are in use:
- **Programming Languages:** Micropython (Raspberry Pi Pico), JavaScript (UI, Backend)  
- **Code Editors:** VS Code  
- **Version Control:** Git  
- **Testing Tools:** Postman  

---

## **Testing Plan**  
- **Sensor Accuracy Tests** – Validate temperature, humidity, and motion sensor data.
- **RFID/NFC System Testing** – Ensure proper user identification.
- **People Counting Verification** – Evaluate the accuracy of the ToF sensor in detecting multiple individuals and distinguishing distances.
- **Smart Lighting Testing** – Verify automatic light control based on PIR sensor data.
- **Real-time Data Processing** – Check for immediate updates in the gym display.
- **System Performance Tests** – Assess system efficiency under multiple users.

---

## **Documentation**  
All project details, updates, and research findings will be documented in the `Group-M` repository and updated regularly.

Link for the presentation slide: https://www.canva.com/design/DAGeEwke-HU/JttUgxHd4m1kYHBm-QW_dw/edit?utm_content=DAGeEwke-HU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton


[Sprint review.pdf](https://github.com/user-attachments/files/18749715/Sprint.review.pdf)
