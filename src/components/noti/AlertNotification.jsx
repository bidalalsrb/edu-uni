// src/components/AlertNotification.jsx
import React, { useState, useEffect } from "react";

const AlertNotification = ({ message, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // 컴포넌트가 마운트되면 보여줌
        setVisible(true);
    }, []);

    const handleClose = () => {
        setVisible(false);
        // 애니메이션 완료 후 onClose 호출 (300ms)
        setTimeout(() => onClose && onClose(), 300);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* 어두운 오버레이 */}
            <div className="fixed inset-0 bg-black opacity-20"></div>
            {/* 중앙 알림창 */}
            <div
                className={`bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm mx-auto transition-transform duration-300 transform ${
                    visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                <p className="text-gray-900 text-center text-base">{message}</p>
                <div className="mt-6">
                    <button
                        onClick={handleClose}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertNotification;
