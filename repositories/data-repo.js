const moment = require("moment");
const db = require("../config/database");
const time = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:00");

module.exports = {
    insertNutrientDataSet: async (sensorData) => {
        let conn;
        let pool = db.pool;

        try {
            console.info(
                `insert NutrientDataSet => ${JSON.stringify(sensorData)}`
            );
            conn = await pool.getConnection();

            const params = [sensorData.ph, sensorData.ec, time];

            await conn.query(
                "INSERT INTO nutrient_data (ph, ec, time) values (?, ?, ?)",
                params
            );
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }
    },

    insertEnvironmentDataSet: async (sensorData) => {
        let conn;
        let pool = db.pool;

        try {
            console.info(
                `insert EnvironmentDataSet => ${JSON.stringify(sensorData)}`
            );
            conn = await pool.getConnection();

            const params = [
                sensorData.temp,
                sensorData.humi,
                sensorData.co2,
                time,
            ];

            await conn.query(
                "INSERT INTO environment_data (temp, humi, co2, time) values (?, ?, ?, ?)",
                params
            );
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }
    },

    insertCultivatorDataSet: async (sensorData) => {
        let conn;
        let pool = db.pool;

        try {
            console.info(
                `insert CultivatorDataSet => ${JSON.stringify(sensorData)}`
            );
            conn = await pool.getConnection();

            const params = [
                sensorData.idx,
                sensorData.soilTemp,
                sensorData.soilHumi,
                sensorData.soilEc,
                time,
            ];

            await conn.query(
                "INSERT INTO environment_data (idx, soil_temp, soil_humi, soil_ec, time) values (?, ?, ?, ?, ?)",
                params
            );
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }
    },
};
