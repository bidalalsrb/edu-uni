import React, { useState, useEffect } from "react";

function CellAdjustModal({ initialRowCount, initialColCount, onApply, onCancel }) {
    const [tempRowCount, setTempRowCount] = useState(initialRowCount);
    const [tempColCount, setTempColCount] = useState(initialColCount);

    useEffect(() => {
        setTempRowCount(initialRowCount);
    }, [initialRowCount]);

    useEffect(() => {
        setTempColCount(initialColCount);
    }, [initialColCount]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className=" max-w-md bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col">
                {/* 상단 헤더 */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800">셀 추가/삭제</h2>
                    <div className="w-6 h-6" />
                </div>
                {/* 본문 영역 */}
                <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
                    {/* 행 개수 영역 */}
                    <div className="flex items-center gap-x-20">
                        <span className="text-sm font-medium text-gray-700">행 개수:</span>
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => setTempRowCount(Math.max(tempRowCount - 1, 1))}
                                className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
                            >
                                -
                            </button>
                            <span className="text-xl font-semibold">{tempRowCount}</span>
                            <button
                                onClick={() => setTempRowCount(tempRowCount + 1)}
                                className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    {/* 열 개수 영역 */}
                    <div className="flex items-center gap-x-20">
                        <span className="text-sm font-medium text-gray-700">열 개수:</span>
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => setTempColCount(Math.max(tempColCount - 1, 1))}
                                className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
                            >
                                -
                            </button>
                            <span className="text-xl font-semibold">{tempColCount}</span>
                            <button
                                onClick={() => setTempColCount(tempColCount + 1)}
                                className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                {/* 하단 버튼 영역 */}
                <div className="border-t px-4 py-3 flex justify-between items-center bg-gray-50">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        취소
                    </button>
                    <button
                        onClick={() => onApply(tempRowCount, tempColCount)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        적용
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CellAdjustModal;
