const constants = require("../common/constants");
const mqtt = require("./config/mqtt");
const client = mqtt.client;
const TOPIC = constants.TOPIC;

const options = {
    retain: true,
    qos: 1,
};

module.exports = {
    // 양액 제어기
    nutrientControl: (message) => {
        client.publish(TOPIC.NUTRIENT_CONTROL, message, options);
    },
    // 공기압 발생기
    airControl: (message) => {
        client.publish(TOPIC.AIR_CONTROL, message, options);
    },
    // 조명 제어기
    ledControl: (message) => {
        client.publish(TOPIC.LED_CONTROL, message, options);
    },
    // 환경 제어기
    environmentControl: (message) => {
        client.publish(TOPIC.ENVIRONMENT_CONTROL, message, options);
    },
};
