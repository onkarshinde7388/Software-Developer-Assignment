// import mqtt from "mqtt";
// import dotenv from "dotenv";
// dotenv.config();

// const client = mqtt.connect(process.env.MQTT_BROKER_URL);

// client.on("connect", () => {
//     console.log("Connected to MQTT Broker");
// });


import mqtt from 'mqtt';
import dotenv from 'dotenv';
import Data from './models/dataSchema.js';
import { io } from './app.js';

dotenv.config();

const client = mqtt.connect(process.env.MQTT_BROKER);

function decodeLE(val) {
  if (val == null) return null;
  const buf = Buffer.alloc(4);
  buf.writeUInt32LE(val);
  return buf.readFloatLE(0);
}

client.on('connect', () => {
  client.subscribe('/application/out/+');
});

client.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    const decoded = {
      uid: payload.uid,
      fw: payload.fw,
      tts: payload.tts,
      data: {
        temp: decodeLE(payload.data.temp),
        hum: decodeLE(payload.data.hum),
        pm25: decodeLE(payload.data['pm2.5'])
      }
    };
    const doc = await Data.create(decoded);
    io.emit(`device_${decoded.uid}`, decoded);
  } catch (e) {
    console.error('MQTT process error:', e);
  }
});
