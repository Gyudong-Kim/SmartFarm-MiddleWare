const express = require("express");
const router = express.Router();
const filterService = require("../services/filter-service");

router.post("/code", function (req, res, next) {
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
