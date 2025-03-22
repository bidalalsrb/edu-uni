import React, { useState } from "react";

// 신규 배치코드 등록 모달 컴포넌트
function NewBatchCodeModal({ onClose, onSave }) {
    const [location, setLocation] = useState("");
    const [person, setPerson] = useState("");
    const [batchCode, setBatchCode] = useState("");

    // 랜덤 4자리 배치코드 생성 (예: "#2222")
    const generateBatchCode = () => {
        const code = Math.floor(1000 + Math.random() * 9000);
        setBatchCode("#" + code);
    };

    const handleSave = () => {
        if (!location || !person || !batchCode) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        const newRecord = {
            location,
            person,
            batchCode,
            registeredDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD 형식
        };
        onSave(newRecord);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">신규 배치코드 등록</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">장소</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="장소 입력"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">담당자</label>
                    <input
                        type="text"
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="담당자 입력"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <button
                        onClick={generateBatchCode}
                        className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600"
                    >
                        배치코드 발급
                    </button>
                    {batchCode && (
                        <span className="ml-4 text-lg font-bold text-gray-800">{batchCode}</span>
                    )}
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewBatchCodeModal;
