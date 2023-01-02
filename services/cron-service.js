const CronJob = require("cron").CronJob;
const moment = require("moment");
const dataRepo = require("../repositories/data-repo");
const publishService = require("./publish-service");
const subscribeService = require("./subscribe-service");

module.exports = {
    cron: async () => {
        const nutrientData = subscribeService.nutrientData;
        const environmentData = subscribeService.environmentData;
        const cultivatorData1 = subscribeService.cultivatorData1;
        const cultivatorData2 = subscribeService.cultivatorData2;

        const task = new CronJob("1 * * * * *", () => {
            let time = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:00");

            console.info(`\n<${time}>`);
            if (
                nutrientData.ph == undefined ||
                environmentData.temp == undefined ||
                cultivatorData1.soilTemp == undefined ||
                cultivatorData2.soilTemp == undefined
            ) {
                console.error("SensorData is empty");
            } else {
                dataRepo.insertNutrientDataSet(nutrientData);
                dataRepo.insertEnvironmentDataSet(environmentData);
                dataRepo.insertCultivatorDataSet(cultivatorData1);
                dataRepo.insertCultivatorDataSet(cultivatorData2);

                publishService.nutrientData(nutrientData);
                publishService.environmentData(environmentData);
                publishService.cultivatorData(cultivatorData1);
                publishService.cultivatorData(cultivatorData2);
            }
        });
        task.start();
    },
};
