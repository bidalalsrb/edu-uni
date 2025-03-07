import React, { useState, useEffect } from "react";

function CellAdjustModal({ initialRowCount, initialColCount, onApply, onCancel }) {
    const [tempRowCount, setTempRowCount] = useState(initialRowCount);
    const [tempColCount, setTempColCount] = useState(initialColCount);

    // 부모의 값이 변경되거나 모달이 열릴 때마다 초기값으로 재설정
    useEffect(() => {
        setTempRowCount(initialRowCount);
    }, [initialRowCount]);

    useEffect(() => {
        setTempColCount(initialColCount);
    }, [initialColCount]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h3 className="text-lg font-bold mb-4">셀 추가/삭제</h3>
                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <span>행 개수: {tempRowCount}</span>
                        <div>
                            <button
                                onClick={() => setTempRowCount(tempRowCount + 1)}
                                className="px-2 py-1 bg-blue-500 text-white rounded"
                            >
                                +
                            </button>
                            <button
                                onClick={() => setTempRowCount(Math.max(tempRowCount - 1, 1))}
                                className="px-2 py-1 bg-blue-500 text-white rounded ml-2"
                            >
                                -
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <span>열 개수: {tempColCount}</span>
                        <div>
                            <button
                                onClick={() => setTempColCount(tempColCount + 1)}
                                className="px-2 py-1 bg-blue-500 text-white rounded"
                            >
                                +
                            </button>
                            <button
                                onClick={() => setTempColCount(Math.max(tempColCount - 1, 1))}
                                className="px-2 py-1 bg-blue-500 text-white rounded ml-2"
                            >
                                -
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    >
                        취소
                    </button>
                    <button
                        onClick={() => onApply(tempRowCount, tempColCount)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        적용
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CellAdjustModal;
