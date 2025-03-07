import React, { useState } from "react";

function ApplyFormModal({ isOpen, onClose, onSubmit }) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [nameInput, setNameInput] = useState("");

    const handleSubmit = () => {
        if (!startTime.trim() || !endTime.trim() || !nameInput.trim()) {
            alert("모든 필드를 입력하세요.");
            return;
        }
        const now = new Date();
        const [startHour, startMinute] = startTime.split(":");
        const [endHour, endMinute] = endTime.split(":");
        const startDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            startHour,
            startMinute
        );
        const endDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            endHour,
            endMinute
        );
        onSubmit({ startTime: startDate, endTime: endDate, name: nameInput });
        setStartTime("");
        setEndTime("");
        setNameInput("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h3 className="text-lg font-bold mb-2">신청 정보 입력</h3>
                <div className="mb-2">
                    <label className="block text-sm font-semibold">시작 시간</label>
                    <input
                        type="time"
                        step="600" // 10분(600초) 단위
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-semibold">끝 시간</label>
                    <input
                        type="time"
                        step="600" // 10분 단위
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-semibold">이름</label>
                    <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="이름 입력"
                    />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
                        취소
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApplyFormModal;
