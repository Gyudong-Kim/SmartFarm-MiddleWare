const mqtt = require("mqtt");
require("dotenv").config();

const option = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: process.env.MQTT_PROTOCOL,
};

const client = mqtt.connect(option);

module.exports = { client };
