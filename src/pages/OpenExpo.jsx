import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가
// 날짜와 장소를 기준으로 보여줄 오픈 박람회 샘플 데이터
const allExpoData = [
    {
        id: 1,
        date: "2025-05-01",
        location: "서울",
        school: "서울대",
        time: "09:00 - 11:00",
        teacher: "홍길동",
        status: "신청 가능"
    },
    {
        id: 2,
        date: "2025-05-01",
        location: "서울",
        school: "고려대",
        time: "11:00 - 13:00",
        teacher: "김철수",
        status: "마감"
    },
    {
        id: 3,
        date: "2025-05-01",
        location: "서울",
        school: "연세대",
        time: "14:00 - 16:00",
        teacher: "이영희",
        status: "신청 가능"
    },
    {
        id: 4,
        date: "2025-05-02",
        location: "부산",
        school: "한양대",
        time: "16:00 - 18:00",
        teacher: "박지성",
        status: "신청 가능"
    },
    {
        id: 5,
        date: "2025-05-02",
        location: "부산",
        school: "경희대",
        time: "18:00 - 20:00",
        teacher: "최민수",
        status: "마감"
    },
    {
        id: 6,
        date: "2025-05-02",
        location: "대구",
        school: "서강대",
        time: "10:00 - 12:00",
        teacher: "김민정",
        status: "마감"
    }
];

// 날짜, 장소 옵션 샘플
const dateOptions = ["2025-05-01", "2025-05-02"];
const locationOptions = ["서울", "부산", "대구"];

function OpenExpo() {
    const navigate = useNavigate(); // useNavigate 훅
    // 선택된 날짜와 장소를 저장할 상태
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    // 필터링된 데이터 계산
    const filteredExpoData = allExpoData.filter((item) => {
        return (
            (!selectedDate || item.date === selectedDate) &&
            (!selectedLocation || item.location === selectedLocation)
        );
    });

    const handleApply = (expoId) => {
        // "/apply" 경로로 이동 (필요하다면 expoId를 전달)
        navigate("/apply", { state: { expoId } });
    };

    return (
        <div className="p-4">
            {/* 제목 */}
            <h2 className="text-center text-2xl font-bold mb-4">오픈 박람회</h2>

            {/* 날짜 & 장소 선택 영역 */}
            <div className="flex space-x-4 justify-center mb-6">
                {/* 날짜 선택 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        날짜
                    </label>
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="block w-40 border border-gray-300 rounded-md p-2"
                    >
                        <option value="">전체</option>
                        {dateOptions.map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 장소 선택 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        장소
                    </label>
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="block w-40 border border-gray-300 rounded-md p-2"
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
            <div className="space-y-3">
                {filteredExpoData.length > 0 ? (
                    filteredExpoData.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-md p-4 hover:bg-gray-50 transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-lg font-semibold text-gray-800 mb-1">
                                        {item.school}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        시간: {item.time} | 강사: {item.teacher}
                                    </div>
                                </div>
                                {/* 신청여부 표시 & 신청하기 버튼 */}
                                <div className="text-right">
                                    <div className="text-sm font-medium">
                                        신청여부: {item.status}
                                    </div>
                                    {item.status === "신청 가능" && (
                                        <button
                                            onClick={() => handleApply(item.id)}
                                            className="mt-1 px-3 py-1 text-sm bg-blue-500 text-white rounded"
                                        >
                                            신청하기
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-sm text-gray-500">
                        해당 날짜와 장소에 대한 박람회가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}

export default OpenExpo;
