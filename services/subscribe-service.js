const moment = require("moment");
const constants = require("../common/constants");
const mqtt = require("../config/mqtt");
const client = mqtt.client;
const TOPIC = constants.TOPIC;

let ph, ec;
let temp, humi, co2;
let soilTemp1, soilHumi1, soilEc1;
let soilTemp2, soilHumi2, soilEc2;

let nutrientData = {
    ph: ph,
    ec: ec,
};

let environmentData = {
    temp: temp,
    humi: humi,
    co2: co2,
};

let cultivatorData1 = {
    idx: 1,
    soilTemp: soilTemp1,
    soilHumi: soilHumi1,
    soilEc: soilEc1,
};
let cultivatorData2 = {
    idx: 2,
    soilTemp: soilTemp2,
    soilHumi: soilHumi2,
    soilEc: soilEc2,
};

const topic_list = [
    TOPIC.HOUSE_NUTRIENT_DATA,
    TOPIC.HOUSE_ENVIRONMENT_DATA,
    TOPIC.HOUSE_CULTIVATOR_DATA,
];

client.on("connect", () => {
    console.log("MQTT connected: " + client.connected);
});

client.on("error", (error) => {
    console.log("MQTT can't connect: " + error);
});

client.subscribe(topic_list, { qos: 1 });

client.on("message", (topic, message, packet) => {
    let json = message.toString();
    filter(topic, json);
});

const filter = (topic, json) => {
    let time = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:00");

    console.info(`\n<${time}>`);
    console.info(`Topic => ${topic}\nMessage => ${json}`);

    try {
        json = JSON.parse(json);

        switch (topic) {
            case TOPIC.HOUSE_NUTRIENT_DATA:
                nutrientData.ph = json.ph;
                nutrientData.ec = json.ec;
                break;

            case TOPIC.HOUSE_ENVIRONMENT_DATA:
                environmentData.temp = json.temp;
                environmentData.humi = json.humi;
                environmentData.co2 = json.co2;
                break;

            case TOPIC.HOUSE_CULTIVATOR_DATA:
                if (json.idx == 1) {
                    cultivatorData1.soilTemp = json.soilTemp;
                    cultivatorData1.soilHumi = json.soilHumi;
                    cultivatorData1.soilEc = json.soilEc;
                } else {
                    cultivatorData2.soilTemp = json.soilTemp;
                    cultivatorData2.soilHumi = json.soilHumi;
                    cultivatorData2.soilEc = json.soilEc;
                }
                break;

            default:
                console.error("Topic that doesn't exist");
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    nutrientData: nutrientData,
    environmentData: environmentData,
    cultivatorData1: cultivatorData1,
    cultivatorData2: cultivatorData2,
};
