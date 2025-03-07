import React, { useState, useEffect } from "react";
import TimePicker from "../../../noti/TimePicker.jsx";

function ApplyFormModal({ isOpen, onClose, onSubmit }) {
    const [startHour, setStartHour] = useState("09");
    const [startMinute, setStartMinute] = useState("00");
    const [endHour, setEndHour] = useState("09");
    const [endMinute, setEndMinute] = useState("10");
    const [nameInput, setNameInput] = useState("");

    useEffect(() => {
        if (isOpen) {
            setStartHour("09");
            setStartMinute("00");
            setEndHour("09");
            setEndMinute("10");
            setNameInput("");
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!nameInput.trim()) {
            alert("이름을 입력하세요.");
            return;
        }
        // 오늘 날짜를 기준으로 선택한 시간으로 Date 객체 생성
        const now = new Date();
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800">신청 정보 입력</h2>
                    <div className="w-6 h-6" />
                </div>
                {/* 본문 영역 */}
                <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
                    <TimePicker
                        label="시작시간"
                        selectedHour={startHour}
                        selectedMinute={startMinute}
                        onHourChange={setStartHour}
                        onMinuteChange={setStartMinute}
                    />
                    <TimePicker
                        label="종료시간"
                        selectedHour={endHour}
                        selectedMinute={endMinute}
                        onHourChange={setEndHour}
                        onMinuteChange={setEndMinute}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
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
