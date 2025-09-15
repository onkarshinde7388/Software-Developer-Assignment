This project simulates an IoT platform where devices send telemetry data (like temperature, humidity, etc.) to specific MQTT topics. The server processes, stores, and manages this data, helping users understand how devices communicate with the backend
Node.js – Server environment

MQTT.js – MQTT client for subscribing and publishing messages

Express.js – API endpoints for device data access

JSON file-based storage – For persisting devices and telemetry data

dotenv – For environment configuration

cors – For cross-origin requests handling


}
📋 API Endpoints
✅ Device Routes
POST /login - For logging the user
GET /devices – Retrieve telemetry data from all devices

GET /devices/:device_id – Retrieve telemetry data for a specific device
