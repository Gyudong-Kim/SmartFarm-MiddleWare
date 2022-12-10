const db = require("../config/database");

module.exports = {
    // 양액 제어기 (예약)
    nutrientReserve: async (json) => {
        let conn;
        let pool = db.pool;

        try {
            console.info(`insert nutrient reserve => ${JSON.stringify(json)}`);
            conn = await pool.getConnection();

            const params = [
                json.paramsDetail.ph,
                json.paramsDetail.ec,
                json.paramsDetail.amount,
                json.paramsDetail.cultivator,
                json.paramsDetail.startTime,
            ];

            let res = await conn.query(
                "INSERT INTO nutrient_reserve (ph, ec, amount, cultivator, start_time) values (?, ?, ?, ?, ?)",
                params
            );

            let reserveInfo = {
                reserveId: res.insertId,
                ph: json.paramsDetail.ph,
                ec: json.paramsDetail.ec,
                amount: json.paramsDetail.amount,
                cultivator: json.paramsDetail.cultivator,
                startTime: json.paramsDetail.startTime,
            };

            return reserveInfo;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }
    },

    // 양액 제어기 (간격)
    nutrientInterval: async (json) => {
        let conn;
        let pool = db.pool;

        try {
            console.info(`insert nutrient interval => ${JSON.stringify(json)}`);
            conn = await pool.getConnection();

            const params = [
                json.paramsDetail.ph,
                json.paramsDetail.ec,
                json.paramsDetail.amount,
                json.paramsDetail.cultivator,
                json.paramsDetail.startTime,
                json.paramsDetail.endTime,
                json.paramsDetail.intervalTime,
            ];

            let res = await conn.query(
                "INSERT INTO nutrient_interval (ph, ec, amount, cultivator, start_time, end_time, interval_time) values (?, ?, ?, ?, ?, ?, ?)",
                params
            );

            let reserveInfo = {
                reserveId: res.insertId,
                ph: json.paramsDetail.ph,
                ec: json.paramsDetail.ec,
                amount: json.paramsDetail.amount,
                cultivator: json.paramsDetail.cultivator,
                startTime: json.paramsDetail.startTime,
                endTime: json.paramsDetail.endTime,
                intervalTime: json.paramsDetail.intervalTime,
            };

            return reserveInfo;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }
    },

    // 공기압 발생기 (예약)
    airReserve: async (json) => {
        let conn;
        let pool = db.pool;

        try {
            console.info(`insert air reserve => ${JSON.stringify(json)}`);
            conn = await pool.getConnection();

            const params = [
                json.paramsDetail.time,
                json.paramsDetail.cultivator,
                json.paramsDetail.startTime,
            ];

            let res = await conn.query(
                "INSERT INTO air_reserve (time, cultivator, start_time) values (?, ?, ?)",
                params
            );

            let reserveInfo = {
                reserveId: res.insertId,
                time: json.paramsDetail.time,
                cultivator: json.paramsDetail.cultivator,
                startTime: json.paramsDetail.startTime,
            };

            return reserveInfo;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }
    },

    // 공기압 발생기 (간격)
    airInterval: async (json) => {
        let conn;
        let pool = db.pool;

        try {
            console.info(`insert air interval => ${JSON.stringify(json)}`);
            conn = await pool.getConnection();

            const params = [
                json.paramsDetail.time,
                json.paramsDetail.cultivator,
                json.paramsDetail.startTime,
                json.paramsDetail.endTime,
                json.paramsDetail.intervalTime,
            ];

            let res = await conn.query(
                "INSERT INTO air_interval (time, cultivator, start_time, end_time, interval_time) values (?, ?, ?, ?, ?)",
                params
            );

            let reserveInfo = {
                reserveId: res.insertId,
                time: json.paramsDetail.time,
                cultivator: json.paramsDetail.cultivator,
                startTime: json.paramsDetail.startTime,
                endTime: json.paramsDetail.endTime,
                intervalTime: json.paramsDetail.intervalTime,
            };

            return reserveInfo;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }
    },

    // 조명 제어기 (예약)
    ledReserve: async (json) => {
        let conn;
        let pool = db.pool;
        let isOn;

        try {
            console.info(`insert led reserve => ${JSON.stringify(json)}`);
            conn = await pool.getConnection();

            if (json.code == "R_M_003") {
                isOn = true;
            } else {
                isOn = false;
            }

            const params = [isOn, json.paramsDetail.startTime];

            let res = await conn.query(
                "INSERT INTO led_reserve (is_on, start_time) values (?, ?)",
                params
            );

            let reserveInfo = {
                reserveId: res.insertId,
                isOn: isOn,
                startTime: json.paramsDetail.startTime,
            };

            return reserveInfo;
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }
    },

    // 예약 작업 후 DB에서 삭제
    deleteReserve: async (reserveInfo, tableName) => {
        let conn;
        let pool = db.pool;
        let id = reserveInfo.reserveId;

        try {
            console.info(`delete reserve => ${JSON.stringify(reserveInfo)}`);
            conn = await pool.getConnection();

            await conn.query(
                `DELETE FROM ${tableName} WHERE reserve_id = (?)`,
                id
            );
        } catch (error) {
            console.error(error);
        } finally {
            if (conn) conn.release();
        }
    },
};
