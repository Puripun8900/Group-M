from machine import Pin, I2C
import time
import dht
import network
import urequests
import ujson

# Network
WIFI_SSID = "iPhonewifi"
WIFI_PASSWORD = "123456788"
SERVER_URL = "https://smartgym-m.azurewebsites.net/sensors"



# PIR sensor
PIR_PIN = 0
LED_PIN = 16
pir = Pin(PIR_PIN, Pin.IN)
led = Pin(LED_PIN, Pin.OUT)

# DHT22 sensor
DHT_PIN = 22
dht_sensor = dht.DHT22(Pin(DHT_PIN))

# VL53L1X sensor (People counter)
'''
# from vl53l1x import VL53L1X
TOF_I2C = I2C(0, scl=Pin(5), sda=Pin(4))
tof = VL53L1X(TOF_I2C)

# People counting variables
PEOPLE_INSIDE = 0
ENTER_THRESHOLD = 1000    # Distance under 1m = entering
EXIT_THRESHOLD = 1500     # Distance over 1.5m = exiting
static_distance_counter = 0
STATIC_DISTANCE_CONFIRMATION = 3
'''

# PN532 NFC (Access control)
'''
# from pn532 import PN532_I2C
NFC_I2C = I2C(1, scl=Pin(7), sda=Pin(6))
nfc = PN532_I2C(NFC_I2C)
AUTHORIZED_CARDS = [
    b'\xAA\xBB\xCC\xDD',
    b'\x11\x22\x33\x44'
]
'''

last_trigger = 0
last_motion_time = 0
led_on = False
last_env_read = 0
ENV_READ_INTERVAL = 900  # 15 minutes
DEBOUNCE_TIME = 500  
CONFIRMATION_DELAY = 100  # time between confirmation checks

# WiFi
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('Connecting to WiFi...')
        wlan.connect(WIFI_SSID, WIFI_PASSWORD)
        while not wlan.isconnected():
            time.sleep(1)
    print('WiFi Connected:', wlan.ifconfig())

# API
def post_sensor_data(type, model, value, unit):
    try:
        data = {
            "type": type,
            "model": model,
            "value": value,
            "unit": unit
        }

        json_data = ujson.dumps(data)
        # Replace the degree symbol if needed
        if "°" in unit:
            json_data = json_data.replace("°", "\\u00B0")

        response = urequests.post(
            SERVER_URL,
            headers={'Content-Type': 'application/json'},
            data=json_data
        )
        print("API Response:", response.text)
        response.close()

    except Exception as e:
        print("API Error:", e)


print("Initializing sensors... (20s)")
connect_wifi()

for i in range(20, 0, -1):
    print(f"Stabilizing... {i}s left", end='\r')
    time.sleep(1)
print("\nAll sensors ready!")

# Main
try:
    while True:
        current_time = time.time()
        current_value = pir.value()
        if not led_on or (current_time - last_motion_time) < 2:  # 2-second cooldown
           if current_time < 10:  
            if pir.value():
                print("Waiting for PIR to settle...")
                time.sleep(0.5)
                continue
        # PIR
        if pir.value():
            time.sleep_ms(CONFIRMATION_DELAY)
            if pir.value():
                time.sleep_ms(CONFIRMATION_DELAY)
                if pir.value():
                    if time.ticks_diff(time.ticks_ms(), last_trigger) > DEBOUNCE_TIME:
                        last_trigger = time.ticks_ms()
                        last_motion_time = current_time
                        if not led_on:
                            led.on()
                            led_on = True
                            print("REAL MOTION DETECTED - LED ON")
                            post_sensor_data("Motion", "AS312", True, "boolean")
            

        # LED off after 5 minutes of last motion detected
        if led_on and (current_time - last_motion_time) > 300:
            led.off()
            led_on = False
            print("No motion for 5 minutes - LED OFF")
            post_sensor_data("Motion", "AS312", False, "boolean")
        

        # DHT22
        if current_time - last_env_read >= ENV_READ_INTERVAL:
            try:
                dht_sensor.measure()
                temp = dht_sensor.temperature()
                hum = dht_sensor.humidity()
                print(f"Temp: {temp}°C, Humidity: {hum}%")
                post_sensor_data("Temperature", "DHT22", temp, "°C")
                post_sensor_data("Humidity", "DHT22", hum, "%")
                
                last_env_read = current_time
            except Exception as e:
                print(f"DHT22 Error: {e}")
                last_env_read = current_time - (ENV_READ_INTERVAL - 30)
        
        '''
        # 3. VL53L1X People Counting Logic
        distance = tof.read()
        if distance < ENTER_THRESHOLD:
            static_distance_counter += 1
            if static_distance_counter >= STATIC_DISTANCE_CONFIRMATION:
                PEOPLE_INSIDE += 1
                print(f"Person Entered! Total inside: {PEOPLE_INSIDE}")
                post_sensor_data("PeopleCount", "VL53L1X", PEOPLE_INSIDE, "persons")
                static_distance_counter = 0
                time.sleep(2)

        elif distance > EXIT_THRESHOLD and PEOPLE_INSIDE > 0:
            static_distance_counter += 1
            if static_distance_counter >= STATIC_DISTANCE_CONFIRMATION:
                PEOPLE_INSIDE -= 1
                print(f"Person Exited! Total inside: {PEOPLE_INSIDE}")
                post_sensor_data("PeopleCount", "VL53L1X", PEOPLE_INSIDE, "persons")
                static_distance_counter = 0
                time.sleep(2)

        else:
            static_distance_counter = 0
        '''
        
        '''
        # 4. PN532 NFC Access Control Logic
        uid = nfc.read_passive_target(timeout=0.1)
        if uid is not None:
            if uid in AUTHORIZED_CARDS:
                print("Access granted!")
                post_sensor_data("Access", "PN532", "Granted", "status")
            else:
                print("Access denied!")
                post_sensor_data("Access", "PN532", "Denied", "status")
            time.sleep(1)
        '''
        
        time.sleep(0.1)

except KeyboardInterrupt:
    led.off()
    print("\nMonitoring stopped")