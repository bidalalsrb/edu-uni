import React, { useState, useEffect } from "react";

function CreateBoxModal({ isOpen, onClose, onSubmit, colorPalette }) {
    const [school, setSchool] = useState("");
    const [time, setTime] = useState("");
    const [teacher, setTeacher] = useState("");
    const [color, setColor] = useState("#ffffff");

    // 모달이 열릴 때마다 초기화
    useEffect(() => {
        if (isOpen) {
            setSchool("");
            setTime("");
            setTeacher("");
            setColor("#ffffff");
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!school.trim()) {
            alert("학교를 입력하세요.");
            return;
        }
        onSubmit({ school, time, teacher, color });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h3 className="text-lg font-bold mb-2">박스 생성</h3>

                <label className="block text-sm font-semibold mb-1">학교</label>
                <input
                    type="text"
                    className="w-full border p-2 rounded mb-3"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                />

                <label className="block text-sm font-semibold mb-1">시간</label>
                <input
                    type="text"
                    className="w-full border p-2 rounded mb-3"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <label className="block text-sm font-semibold mb-1">강사</label>
                <input
                    type="text"
                    className="w-full border p-2 rounded mb-3"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                />

                <label className="block text-sm font-semibold mb-1">박스 색상</label>
                <div className="flex flex-wrap gap-2 mb-3">
                    {colorPalette.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            className={`w-6 h-6 rounded-full border ${
                                color === c ? "border-black" : "border-transparent"
                            }`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        완료하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateBoxModal;
