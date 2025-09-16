// src/data/sampleData.js

// 임시 데이터 예시 (배치도 데이터)
const sampleLayout = {
    boxes: [
        {
            id: 101,
            placed: true,
            rowNum: 0,
            colNum: 0,
            companyName: "삼성전자",
            color: "#4682B4",
            applications: [
                {
                    id: 1001,
                    startTime: "2025-03-01T09:00:00", // ISO 형식의 문자열
                    endTime: "2025-03-01T09:10:00",
                    name: "김대리",
                },
                {
                    id: 1002,
                    startTime: "2025-03-01T09:15:00",
                    endTime: "2025-03-01T09:25:00",
                    name: "오과장",
                },
                {
                    id: 1003,
                    startTime: "2025-03-01T09:15:00",
                    endTime: "2025-03-01T09:25:00",
                    name: "김대리",
                },
                {
                    id: 1004,
                    startTime: "2025-03-01T09:15:00",
                    endTime: "2025-03-01T09:25:00",
                    name: "김주임",
                },
                {
                    id: 1005,
                    startTime: "2025-03-01T09:15:00",
                    endTime: "2025-03-01T09:25:00",
                    name: "김대표",
                },
            ],
        },
        {
            id: 102,
            placed: true,
            rowNum: 0,
            colNum: 1,
            companyName: "네이버",
            color: "#00ff00",
            applications: [
                {
                    id: 1006,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네대리",
                }, {
                    id: 1007,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네주임",
                }, {
                    id: 1008,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네과장",
                }, {
                    id: 1009,
                    startTime: "2025-03-01T09:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네대리",
                }, {
                    id: 1010,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네책임",
                }, {
                    id: 1011,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네인턴",
                },
            ],
        },
        {
            id: 104,
            placed: true,
            rowNum: 0,
            colNum: 3,
            companyName: "카카오",
            color: "#FFFACD",
            applications: [
                {
                    id: 1012,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카대리",
                }, {
                    id: 1013,
                    startTime: "2025-03-01T09:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카주임",
                }, {
                    id: 1014,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카과장",
                }, {
                    id: 1015,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카대리",
                }, {
                    id: 1016,
                    startTime: "2025-03-01T09:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카책임",
                }, {
                    id: 1017,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카인턴",
                },
            ],
        },
    ],
    rowCount: 5,
    colCount: 8,
};

export default sampleLayout;
