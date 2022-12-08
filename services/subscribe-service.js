const constants = require("../common/constants");
const mqtt = require("../config/mqtt");
const dataRepo = require("../repositories/data-repo");

const client = mqtt.client;
const TOPIC = constants.TOPIC;

const topic_list = [
    TOPIC.NUTRIENT_DATA,
    TOPIC.ENVIRONMENT_DATA,
    TOPIC.CULTIVATOR_DATA,
];

client.on("connect", () => {
    console.log("MQTT connected: " + client.connected);
});

client.on("error", (error) => {
    console.log("MQTT can't connect: " + error);
});

client.subscribe(topic_list, { qos: 1 });

client.on("message", (topic, message, packet) => {
    var message = message.toString();
    filter(topic, message);
});

const filter = (topic, message) => {
    console.info(`Topic => ${topic}\nMessage => ${message}`);

    message = JSON.parse(message);

    switch (topic) {
        case TOPIC.NUTRIENT_DATA:
            dataRepo.insertNutrientDataSet(message);
            break;

        case TOPIC.ENVIRONMENT_DATA:
            dataRepo.insertEnvironmentDataSet(message);
            break;

        case TOPIC.CULTIVATOR_DATA:
            dataRepo.insertCultivatorDataSet(message);
            break;

        default:
            console.error("Topic that doesn't exist");
    }
};
