import React, { useState, useEffect } from "react";

function CreateBoxModal({ isOpen, onClose, onSubmit, colorPalette = [] }) {
    const [school, setSchool] = useState("");
    const [time, setTime] = useState("");
    const [teacher, setTeacher] = useState("");
    const [color, setColor] = useState("#ffffff");

    // 모달이 열릴 때 초기화
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
            alert("학교명을 입력하세요.");
            return;
        }
        onSubmit({ school, time, teacher, color });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="w-[90%] max-w-md bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col">
                {/* 상단 헤더 영역 */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        {/* 닫기 버튼 (X 아이콘) */}
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
                    <h2 className="text-lg font-semibold text-gray-800">박스 생성</h2>
                    <div className="w-6 h-6" />
                </div>

                {/* 본문 영역 */}
                <div className="flex-1 overflow-y-auto px-4 py-5">
                    {/* 학교 */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">학교</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            placeholder="예) 서울대학교"
                        />
                    </div>
`
                    {/* 시간 */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">시간</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="예) 09:00 ~ 11:00"
                        />
                    </div>

                    {/* 강사 */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">강사</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={teacher}
                            onChange={(e) => setTeacher(e.target.value)}
                            placeholder="예) 홍길동"
                        />
                    </div>

                    {/* 박스 색상 */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">박스 색상</label>
                        <div className="flex flex-wrap gap-2">
                            {colorPalette.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`w-8 h-8 rounded-full border-2 transition ${
                                        color === c ? "border-blue-500" : "border-transparent"
                                    }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
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

export default CreateBoxModal;
