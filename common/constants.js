module.exports = Object.freeze({
    OP_CODE: {
        C_M_001: "C_M_001", // 제어 관리기_양액 제어기_즉시 공급
        C_M_002: "C_M_002", // 제어 관리기_공기압 발생기_즉시 공급
        C_M_003: "C_M_003", // 제어 관리기_조명 제어기_즉시 ON
        C_M_004: "C_M_004", // 제어 관리기_조명 제어기_즉시 OFF
        C_M_005: "C_M_005", // 제어 관리기_환경 제어기_즉시 설정

        R_M_001: "R_M_001", // 예약 관리기_양액 제어기_예약 공급
        R_M_002: "R_M_002", // 예약 관리기_공기압 발생기_예약 공급
        R_M_003: "R_M_003", // 예약 관리기_조명 제어기_예약 ON
        R_M_004: "R_M_004", // 예약 관리기_조명 제어기_예약 OFF

        I_M_001: "I_M_001", // 간격 관리기_양액 제어기_간격 공급
        I_M_002: "I_M_002", // 간격 관리기_공기압 발생기_간격 공급

        C_S_001: "C_S_001", // 시스템 관리기_비상정지 (양액 제어기, 공기압 발생기)
    },

    TOPIC: {
        NUTRIENT_DATA: "nutrient_data", // 양액 데이터 (Sub)
        ENVIRONMENT_DATA: "environment_data", // 환경 데이터 (Sub)
        CULTIVATOR_DATA: "cultivator_data", // 재배기 데이터 (Sub)

        NUTRIENT_CONTROL: "nutrient_control", // 양액 제어기 (Pub)
        AIR_CONTROL: "air_control", // 공기압 발생기 (Pub)
        LED_CONTROL: "led_control", // 조명 제어기 (Pub)
        ENVIRONMENT_CONTROL: "environment_control", // 환경 제어기 (Pub)
        EMERGENCY_STOP: "emergency_stop", // 비상정지 (양액 제어기, 공기압 발생기) (Pub)
    },
});
