const express = require("express");
const moment = require("moment");
const router = express.Router();
const filterService = require("../services/filter-service");

router.post("/code", function (req, res, next) {
    let time = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:00");

    console.info(`\n<${time}>`);
    console.info(`Data from server => ${JSON.stringify(req.body)}`);
    try {
        filterService.filter(req.body);

        res.json({
            res: true,
        });
    } catch (error) {
        res.json({
            res: false,
        });
    }
});

module.exports = router;
