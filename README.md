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
The **Smart Gym IoT System** is designed to improve the gym experience by using IoT technology to monitor environmental conditions, track gym occupancy, and automate lighting. A **Raspberry Pi** will collect data from various sensors to display **temperature, humidity, and real-time gym occupancy**. An **RFID/NFC key system** will recognize users, and a **sensor-based system** will accurately count the number of people entering. The system will also include **smart lighting control**, ensuring lights turn on when people are detected and switch off when the gym is empty. Some additional features may also be implemented. 

---

## **Scope**  
This project aims to create an intelligent gym environment by:
- Monitoring and displaying **temperature and humidity**.
- Identifying users using **RFID/NFC key cards**.
- Accurately tracking the number of people entering the gym using a **Time-of-Flight (ToF) sensor**.
- Displaying a **personalized welcome message** for gym members based on users gym activity.
- Providing **real-time gym occupancy data**.
- Implementing **smart lighting automation** for energy efficiency.

---

## **Challenges & Solutions**  
### **Accurate People Counting**  
A simple PIR motion sensor is not accurate for counting multiple individuals entering simultaneously. To ensure proper counting, we will:
- **Use a Time-of-Flight (ToF) sensor (VL53L1X)** to measure distance and detect multiple people.
- **Utilize advanced distance measurement algorithms** to distinguish individuals.
- **Optimize sensor placement at the entrance** to improve detection accuracy.


### **Automated Lighting System**  
- **PIR motion sensors (HC-SR501) will be used inside the gym** to detect movement.
- **Smart relays or IoT-enabled switches** will control the lights based on occupancy.
- **A timeout mechanism** will ensure lights remain on when activity is detected and turn off when no motion is observed for a set duration.

---

## **Goals and Deliverables**  
### **Goals:**  
- Build a fully functional **IoT-powered smart gym system**.
- Enable **real-time data collection and processing**.
- Design an intuitive **user interface** to display gym data.
- Optimize **energy consumption with smart lighting**.

### **Deliverables:**  
- **Hardware setup** (Raspberry Pi, sensors, display, and lighting system).
- **Software development** (sensor integration, backend processing, and UI).
- **Testing and validation** to ensure system efficiency.
- **Complete documentation and final project report**.

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
| Puripan Leelapong-Anan      | Embedded Systems Engineer | Integrate and configure sensors with Raspberry Pi  |  
| Oumaima Oubihi              | Embedded Systems Engineer | Work on sensor communication and data handling  |  
| Md Rakibuzzaman Rakib       | Backend & Project Manager | Develop backend logic and oversee project execution  |  

---

## **Tools for Communication**  
- **Messaging & Collaboration:** WhatsApp, Discord, Trello  
- **Documentation:** Google Docs, Canva  
- **Version Control:** GitHub

---

## **Research Topics**  
The team is exploring:
- **Sensor Technologies:** DHT22, VL53L1X (ToF Sensor), BME280, PIR Motion Sensor (HC-SR501), RFID/NFC Reader (PN532 or RC522.
- **Data Processing:** HTTP/MQTT, InfluxDB, real-time visualization  
- **Security Measures:** Secure HTTP/MQTT transmission, user authentication  
- **Smart Lighting Automation:** PIR sensor control, relay system  

---

## **Development Setup**  
The following tools and software are in use:
- **Programming Languages:** Micropython (Raspberry Pi), JavaScript (UI, Backend)  
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
