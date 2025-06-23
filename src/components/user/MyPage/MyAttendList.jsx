import React from "react";

// 예시 데이터
const joinItems = [
    {
        id: 1,
        expoName: "코엑스 AI 박람회",
        teacher: "남상민",
        time: "2025-02-14",
        attendance: "참석",
    },
    {
        id: 2,
        expoName: "부산 취업박람회",
        teacher: "김하나",
        time: "2025-03-20",
        attendance: "불참석",
    },
    {
        id: 3,
        expoName: "서울 청년드림 잡페어",
        teacher: "이수현",
        time: "2025-04-15",
        attendance: "대기중",
    },
];

function MyAttendList() {
    return (
        <section className="w-full bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800">참석 내역 조회</h2>
            <div className="divide-y">
                {joinItems.length === 0 ? (
                    <div className="text-gray-500 py-6 text-center">참석 내역이 없습니다.</div>
                ) : (
                    joinItems.map((item) => {
                        let badgeStyle = "";
                        if (item.attendance === "참석") badgeStyle = "bg-blue-100 text-blue-500";
                        else if (item.attendance === "불참석") badgeStyle = "bg-red-100 text-red-500";
                        else if (item.attendance === "대기중") badgeStyle = "bg-green-100 text-green-600";
                        return (
                            <div key={item.id} className="flex flex-col md:flex-row md:items-center py-4 gap-2 md:gap-6">
                                <div className="flex-1">
                                    <span className="font-semibold text-gray-800">{item.expoName}</span>
                                    <span className="mx-2 text-gray-300 hidden md:inline">|</span>
                                    <span className="text-sm text-gray-500">담당: {item.teacher}</span>
                                    <span className="mx-2 text-gray-300 hidden md:inline">|</span>
                                    <span className="text-sm text-gray-500">{item.time}</span>
                                </div>
                                <span className={`inline-block px-4 py-1 rounded-full font-bold text-xs ${badgeStyle}`}>
                                    {item.attendance}
                                </span>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}

export default MyAttendList;
