import React, { useState, useEffect } from "react";

function EditBoxModal({ isOpen, onClose, box, onSubmit, colorPalette }) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        if (isOpen && box) {
            // 회사 박스면 companyName, 아니면 school 값을 기본값으로 사용
            setName(box.companyName || box.school || "");
            setColor(box.color || "#ffffff");
        }
    }, [isOpen, box]);

    const handleSubmit = () => {
        if (!name.trim()) {
            alert("이름을 입력하세요.");
            return;
        }
        // 업데이트할 때, 회사박스와 학교박스 모두 호환되도록 두 필드를 함께 업데이트
        onSubmit({
            ...box,
            companyName: name,
            school: name,
            color,
        });
    };

    if (!isOpen || !box) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h3 className="text-lg font-bold mb-2">박스 설정</h3>
                <label className="block text-sm font-semibold mb-1">이름</label>
                <input
                    type="text"
                    className="w-full border p-2 rounded mb-3 focus:outline-none focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="block text-sm font-semibold mb-1">박스 색상</label>
                <div className="flex flex-wrap gap-2 mb-3">
                    {colorPalette.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            className={`w-6 h-6 rounded-full border ${color === c ? "border-black" : "border-transparent"}`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
                        취소
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
                        완료하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditBoxModal;
