const constants = require("../common/constants");
const mqtt = require("../config/mqtt");
const client = mqtt.client;
const TOPIC = constants.TOPIC;

const options = {
    retain: true,
    qos: 1,
};

module.exports = {
    // 양액 제어기
    nutrientControl: (json) => {
        client.publish(TOPIC.NUTRIENT_CONTROL, JSON.stringify(json), options);
        console.log(`MQTT Publish => ${JSON.stringify(json)}`);
    },
    // 공기압 발생기
    airControl: (json) => {
        client.publish(TOPIC.AIR_CONTROL, JSON.stringify(json), options);
        console.log(`MQTT Publish => ${JSON.stringify(json)}`);
    },
    // 조명 제어기
    ledControl: (json) => {
        client.publish(TOPIC.LED_CONTROL, JSON.stringify(json), options);
        console.log(`MQTT Publish => ${JSON.stringify(json)}`);
    },
    // 환경 제어기
    environmentControl: (json) => {
        client.publish(
            TOPIC.ENVIRONMENT_CONTROL,
            JSON.stringify(json),
            options
        );
        console.log(`MQTT Publish => ${JSON.stringify(json)}`);
    },
    // 비상정지
    emergencyStop: (json) => {
        client.publish(TOPIC.EMERGENCY_STOP, JSON.stringify(json), options);
        console.log(`MQTT Publish => ${JSON.stringify(json)}`);
    },
};
