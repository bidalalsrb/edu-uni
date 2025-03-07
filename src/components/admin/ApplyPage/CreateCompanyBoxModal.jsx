import React, { useState, useEffect } from "react";

function CreateCompanyBoxModal({ isOpen, onClose, onSubmit, colorPalette }) {
    const [companyName, setCompanyName] = useState("");
    const [color, setColor] = useState("#ffffff");

    // 모달이 열릴 때마다 입력값 초기화
    useEffect(() => {
        if (isOpen) {
            setCompanyName("");
            setColor("#ffffff");
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!companyName.trim()) {
            alert("기업명을 입력하세요.");
            return;
        }
        onSubmit({ companyName, color });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h3 className="text-lg font-bold mb-2">기업 박스 생성</h3>
                <label className="block text-sm font-semibold mb-1">기업명</label>
                <input
                    type="text"
                    className="w-full border p-2 rounded mb-3"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
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

export default CreateCompanyBoxModal;
