import React, { useState, useEffect } from "react";

function ApplyFormModal({ isOpen, onClose, onSubmit }) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [nameInput, setNameInput] = useState("");

    useEffect(() => {
        if (isOpen) {
            setStartTime("");
            setEndTime("");
            setNameInput("");
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!startTime.trim() || !endTime.trim() || !nameInput.trim()) {
            alert("모든 필드를 입력하세요.");
            return;
        }
        // 시간 문자열을 현재 날짜 기준 Date 객체로 변환
        const now = new Date();
        const [startHour, startMinute] = startTime.split(":");
        const [endHour, endMinute] = endTime.split(":");
        const startDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            parseInt(startHour),
            parseInt(startMinute)
        );
        const endDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            parseInt(endHour),
            parseInt(endMinute)
        );
        onSubmit({ startTime: startDate, endTime: endDate, name: nameInput });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="w-[90%] max-w-md bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col">
                {/* 상단 헤더 */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800">신청 정보 입력</h2>
                    <div className="w-6 h-6" />
                </div>
                {/* 본문 영역 */}
                <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            시작 시간
                        </label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            끝 시간
                        </label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            이름
                        </label>
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="이름 입력"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                {/* 하단 버튼 영역 */}
                <div className="border-t px-4 py-3 flex justify-between items-center bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        완료하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApplyFormModal;
