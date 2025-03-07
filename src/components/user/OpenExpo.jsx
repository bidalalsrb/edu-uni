import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid"; // 예시 아이콘

const allExpoData = [
    {
        id: 1,
        date: "2025-05-01",
        location: "서울",
        school: "서울대",
        time: "09:00 - 11:00",
        teacher: "홍길동",
        status: "신청 가능",
    },
    {
        id: 2,
        date: "2025-05-01",
        location: "서울",
        school: "고려대",
        time: "11:00 - 13:00",
        teacher: "김철수",
        status: "마감",
    },
    {
        id: 3,
        date: "2025-05-01",
        location: "서울",
        school: "연세대",
        time: "14:00 - 16:00",
        teacher: "이영희",
        status: "신청 가능",
    },
    {
        id: 4,
        date: "2025-05-02",
        location: "부산",
        school: "한양대",
        time: "16:00 - 18:00",
        teacher: "박지성",
        status: "신청 가능",
    },
    {
        id: 5,
        date: "2025-05-02",
        location: "부산",
        school: "경희대",
        time: "18:00 - 20:00",
        teacher: "최민수",
        status: "마감",
    },
    {
        id: 6,
        date: "2025-05-02",
        location: "대구",
        school: "서강대",
        time: "10:00 - 12:00",
        teacher: "김민정",
        status: "마감",
    },
];

const dateOptions = ["2025-05-01", "2025-05-02"];
const locationOptions = ["서울", "부산", "대구"];

function OpenExpo() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    const filteredExpoData = allExpoData.filter((item) => {
        return (
            (!selectedDate || item.date === selectedDate) &&
            (!selectedLocation || item.location === selectedLocation)
        );
    });

    const handleApply = (expoId) => {
        navigate("/apply", { state: { expoId } });
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-center text-2xl font-bold mb-4">오픈 박람회</h2>
            {/* 날짜 & 장소 선택 */}
            <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full sm:w-40 border border-gray-300 rounded-md p-2"
                    >
                        <option value="">전체</option>
                        {dateOptions.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">장소</label>
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full sm:w-40 border border-gray-300 rounded-md p-2"
                    >
                        <option value="">전체</option>
                        {locationOptions.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* 박람회 리스트 */}
            <div className="space-y-4">
                {filteredExpoData.length > 0 ? (
                    filteredExpoData.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-md p-4 hover:bg-gray-50 transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{item.school}</h3>
                                    <p className="text-sm text-gray-600">
                                        시간: {item.time} | 강사: {item.teacher}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">{item.status}</p>
                                    {item.status === "신청 가능" && (
                                        <button
                                            onClick={() => handleApply(item.id)}
                                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            신청하기
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-sm text-gray-500">해당 날짜와 장소에 대한 박람회가 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default OpenExpo;
