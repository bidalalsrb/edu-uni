import React, { useState } from "react";

function EditBatchCodeModal({ record, onClose, onUpdate }) {
    const [location, setLocation] = useState(record.location);
    const [person, setPerson] = useState(record.person);

    const handleUpdate = () => {
        if (!location || !person) {
            alert("장소와 담당자를 입력해주세요.");
            return;
        }
        const updatedRecord = { ...record, location, person };
        onUpdate(updatedRecord);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">배치코드 상세보기</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">배치코드</label>
                    <div className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-sm">
                        {record.batchCode}
                    </div>
                </div>
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
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditBatchCodeModal;
