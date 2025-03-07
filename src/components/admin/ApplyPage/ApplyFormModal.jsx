import React, { useState } from "react";

function ApplyFormModal({ isOpen, onClose, onSubmit }) {
    const [selectedTime, setSelectedTime] = useState("");
    const [nameInput, setNameInput] = useState("");

    const handleSubmit = () => {
        if (!selectedTime.trim() || !nameInput.trim()) {
            alert("모든 필드를 입력하세요.");
            return;
        }
        // 선택된 시간을 현재 날짜 기준의 Date 객체로 변환
        const now = new Date();
        const [hour, minute] = selectedTime.split(":");
        const timeObj = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hour,
            minute
        );
        onSubmit({ time: timeObj, name: nameInput });
        // 입력값 초기화
        setSelectedTime("");
        setNameInput("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h3 className="text-lg font-bold mb-2">신청 정보 입력</h3>
                <div className="mb-2">
                    <label className="block text-sm font-semibold">시간</label>
                    <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
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
