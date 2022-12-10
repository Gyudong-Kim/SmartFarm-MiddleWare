const publishService = require("../services/publish-service");
const reserveRepo = require("../repositories/reserve-repo");
const CronJob = require("cron").CronJob;

// 예약 TableName
const nutrientReserve = "nutrient_reserve";
const nutrientInterval = "nutrient_interval";
const airReserve = "air_reserve";
const airInterval = "air_interval";
const ledReserve = "led_reserve";

const reserveList = [];

// 1회 예약 로직
const reserveJob = (reserveInfo, json, tableName) => {
    const newCronjob = new CronJob(
        new Date(reserveInfo.startTime.replace("T", " ")),
        function () {
            console.info("Job Start");

            json = {
                reserveId: reserveInfo.reserveId,
                code: json.code,
                paramsDetail: json.paramsDetail,
            };

            if (json.code == "R_M_001") {
                json.code = "C_M_001";
                publishService.nutrientControl(json);
            } else if (json.code == "R_M_002") {
                json.code = "C_M_002";
                publishService.airControl(json);
            } else if (json.code == "R_M_003") {
                json.code = "C_M_003";
                publishService.ledControl(json);
            } else {
                json.code = "C_M_004";
                publishService.ledControl(json);
            }

            reserveRepo.deleteReserve(reserveInfo, tableName);
            this.stop();
        },
        function () {
            console.info("Job Stop");
        },
        true
    );

    reserveList.push(newCronjob);
};

// 간격 예약 로직
const intervalJob = (reserveInfo, json, tableName) => {
    const startTime = new Date(reserveInfo.startTime.replace("T", " "));
    const endTime = new Date(reserveInfo.endTime.replace("T", " "));
    const intervalTime = reserveInfo.intervalTime;

    const month =
        startTime.getMonth() === endTime.getMonth()
            ? startTime.getMonth()
            : `${startTime.getMonth()}-${endTime.getMonth()}`;
    const day =
        startTime.getDate() === endTime.getDate()
            ? startTime.getDate()
            : `${startTime.getDate()}-${endTime.getDate()}`;

    const cronStr = `${startTime.getSeconds()} ${startTime.getMinutes()}/${intervalTime} ${startTime.getHours()} ${day} ${month} *`;
    console.info("Cron String => " + cronStr);

    const newIntervalCronJob = new CronJob(
        cronStr,
        function () {
            if (new Date(endTime).getTime() <= new Date().getTime()) {
                reserveRepo.deleteReserve(reserveInfo, tableName);
                this.stop();
            } else {
                console.info("JOB START");

                json = {
                    reserveId: reserveInfo.reserveId,
                    code: json.code,
                    paramsDetail: json.paramsDetail,
                };

                if (json.code == "I_M_001") {
                    json.code = "C_M_001";
                    publishService.nutrientControl(json);
                } else {
                    json.code = "C_M_002";
                    publishService.airControl(json);
                }
            }
        },
        function () {
            console.info("JOB STOP");
        },
        true
    );

    reserveList.push(newIntervalCronJob);
};

module.exports = {
    // 양액 제어기 (예약)
    addNutrientReserve: (json) => {
        reserveRepo
            .nutrientReserve(json)
            .then((reserveInfo) => {
                reserveJob(reserveInfo, json, nutrientReserve);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    // 양액 제어기 (간격)
    addNutrientInterval: (json) => {
        reserveRepo
            .nutrientInterval(json)
            .then((reserveInfo) => {
                intervalJob(reserveInfo, json, nutrientInterval);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    // 공기압 발생기 (예약)
    addAirReserve: (json) => {
        reserveRepo
            .airReserve(json)
            .then((reserveInfo) => {
                reserveJob(reserveInfo, json, airReserve);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    // 공기압 발생기 (간격)
    addAirInterval: (json) => {
        reserveRepo
            .airInterval(json)
            .then((reserveInfo) => {
                intervalJob(reserveInfo, json, airInterval);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    // 조명 제어기 (예약)
    addLedReserve: (json) => {
        reserveRepo
            .ledReserve(json)
            .then((reserveInfo) => {
                reserveJob(reserveInfo, json, ledReserve);
            })
            .catch((error) => {
                console.error(error);
            });
    },
};
