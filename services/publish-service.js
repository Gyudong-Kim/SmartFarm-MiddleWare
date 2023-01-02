const constants = require("../common/constants");
const mqtt = require("../config/mqtt");
const client = mqtt.client;
const TOPIC = constants.TOPIC;

const options = {
    retain: false,
    qos: 0,
};

module.exports = {
    // 양액 제어기
    nutrientControl: (json) => {
        const code = json.code;
        const cultivator = json.paramsDetail.cultivator;
        const ph = json.paramsDetail.ph;
        const ec = json.paramsDetail.ec;
        const amount = json.paramsDetail.amount;
        const message = {
            code: code,
            cultivator: cultivator,
            ph: ph,
            ec: ec,
            amount: amount,
        };

        client.publish(
            TOPIC.NUTRIENT_CONTROL,
            JSON.stringify(message),
            options
        );
        console.log(`MQTT Publish => ${JSON.stringify(message)}`);
    },
    // 공기압 발생기
    airControl: (json) => {
        const code = json.code;
        const cultivator = json.paramsDetail.cultivator;
        const time = json.paramsDetail.time;
        const message = {
            code: code,
            cultivator: cultivator,
            time: time,
        };

        client.publish(TOPIC.AIR_CONTROL, JSON.stringify(message), options);
        console.log(`MQTT Publish => ${JSON.stringify(message)}`);
    },
    // 조명 제어기
    ledControl: (json) => {
        const code = json.code;
        const message = {
            code: code,
        };

        client.publish(TOPIC.LED_CONTROL, JSON.stringify(message), options);
        console.log(`MQTT Publish => ${JSON.stringify(message)}`);
    },
    // 환경 제어기
    environmentControl: (json) => {
        const code = json.code;
        const temp = json.paramsDetail.temp;
        const humi = json.paramsDetail.humi;
        const co2 = json.paramsDetail.co2;
        const message = {
            code: code,
            temp: temp,
            humi: humi,
            co2: co2,
        };

        client.publish(
            TOPIC.ENVIRONMENT_CONTROL,
            JSON.stringify(message),
            options
        );
        console.log(`MQTT Publish => ${JSON.stringify(message)}`);
    },
    // 비상정지
    emergencyStop: (json) => {
        const code = json.code;
        const message = {
            code: code,
        };

        client.publish(TOPIC.EMERGENCY_STOP, JSON.stringify(message), options);
        console.log(`MQTT Publish => ${JSON.stringify(message)}`);
    },
    // 양액 데이터 전송
    nutrientData: (json) => {
        client.publish(TOPIC.NUTRIENT_DATA, JSON.stringify(json), options);
        console.log(`MQTT Publish => ${JSON.stringify(json)}`);
    },
    // 환경 데이터 전송
    environmentData: (json) => {
        client.publish(TOPIC.ENVIRONMENT_DATA, JSON.stringify(json), options);
        console.log(`MQTT Publish => ${JSON.stringify(json)}`);
    },
    // 재배기 데이터 전송
    cultivatorData: (json) => {
        client.publish(TOPIC.CULTIVATOR_DATA, JSON.stringify(json), options);
        console.log(`MQTT Publish => ${JSON.stringify(json)}`);
    },
};
