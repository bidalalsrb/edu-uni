// src/data/sampleData.js

// 임시 데이터 예시 (배치도 데이터)
const sampleLayout = {
    boxes: [
        {
            id: 1,
            placed: true,
            row: 0,
            col: 0,
            companyName: "삼성전자",
            color: "#4682B4",
            applications: [
                {
                    id: 101,
                    startTime: "2025-03-01T09:00:00", // ISO 형식의 문자열
                    endTime: "2025-03-01T09:10:00",
                    name: "김대리",
                },
                {
                    id: 102,
                    startTime: "2025-03-01T09:15:00",
                    endTime: "2025-03-01T09:25:00",
                    name: "오과장",
                },
                {
                    id: 103,
                    startTime: "2025-03-01T09:15:00",
                    endTime: "2025-03-01T09:25:00",
                    name: "김대리",
                },
                {
                    id: 104,
                    startTime: "2025-03-01T09:15:00",
                    endTime: "2025-03-01T09:25:00",
                    name: "김주임",
                },
                {
                    id: 105,
                    startTime: "2025-03-01T09:15:00",
                    endTime: "2025-03-01T09:25:00",
                    name: "김대표",
                },
            ],
        },
        {
            id: 2,
            placed: true,
            row: 0,
            col: 1,
            companyName: "네이버",
            color: "#00ff00",
            applications: [
                {
                    id: 1,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네대리",
                },    {
                    id: 2,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네주임",
                },    {
                    id: 3,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네과장",
                },    {
                    id: 4,
                    startTime: "2025-03-01T09:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네대리",
                },    {
                    id: 5,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네책임",
                }, {
                    id: 6,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "네인턴",
                },
            ],
        },
        {
            id: 3,
            placed: false,
            row: null,
            col: null,
            companyName: "Example Company C",
            color: "#0000ff",
            applications: [],
        },
        {
            id: 4,
            placed: true,
            row: 0,
            col: 3,
            companyName: "카카오",
            color: "#FFFACD",
            applications: [
                {
                    id: 11,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카대리",
                },    {
                    id: 12,
                    startTime: "2025-03-01T09:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카주임",
                },    {
                    id: 13,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카과장",
                },    {
                    id: 14,
                    startTime: "2025-03-01T10:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카대리",
                },    {
                    id: 15,
                    startTime: "2025-03-01T09:00:00",
                    endTime: "2025-03-01T10:10:00",
                    name: "카책임",
                }, {
                    id: 16,
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
