const constants = require("../common/constants");
const publishService = require("../services/publish-service");
const reserveService = require("../services/reserve-service");

module.exports = {
    filter: (json) => {
        const OP_CODE = constants.OP_CODE;
        switch (json.code) {
            // 제어 관리기_양액 제어기_즉시 공급
            case OP_CODE.C_M_001:
                publishService.nutrientControl(json);
                break;

            // 제어 관리기_공기압 발생기_즉시 공급
            case OP_CODE.C_M_002:
                publishService.airControl(json);
                break;

            // 제어 관리기_조명 제어기_즉시 ON
            case OP_CODE.C_M_003:
                publishService.ledControl(json);
                break;

            // 제어 관리기_조명 제어기_즉시 OFF
            case OP_CODE.C_M_004:
                publishService.ledControl(json);
                break;

            // 제어 관리기_환경 제어기_즉시 설정
            case OP_CODE.C_M_005:
                publishService.environmentControl(json);
                break;

            // 예약 관리기_양액 제어기_예약 공급
            case OP_CODE.R_M_001:
                reserveService.addNutrientReserve(json);
                break;

            // 예약 관리기_공기압 발생기_예약 공급
            case OP_CODE.R_M_002:
                reserveService.addAirReserve(json);
                break;

            // 예약 관리기_조명 제어기_예약 ON
            case OP_CODE.R_M_003:
                reserveService.addLedReserve(json);
                break;

            // 예약 관리기_조명 제어기_예약 OFF
            case OP_CODE.R_M_004:
                reserveService.addLedReserve(json);
                break;

            // 간격 관리기_양액 제어기_간격 공급
            case OP_CODE.I_M_001:
                reserveService.addNutrientInterval(json);
                break;

            // 간격 관리기_공기압 발생기_간격 공급
            case OP_CODE.I_M_002:
                reserveService.addAirInterval(json);
                break;

            // 시스템 관리기_비상정지 (양액 제어기, 공기압 발생기)
            case OP_CODE.C_S_001:
                publishService.emergencyStop(json);
                break;

            default:
                console.error("OP_CODE that doesn't exist");
        }
    },
};
