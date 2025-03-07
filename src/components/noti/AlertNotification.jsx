// src/components/noti/AlertNotification.jsx
import React, { useState, useEffect } from "react";

const AlertNotification = ({ message, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // 마운트 시 애니메이션 시작
        setVisible(true);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => onClose && onClose(), 300);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* 어둡게 처리된 오버레이 */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                    visible ? "opacity-40" : "opacity-0"
                }`}
            ></div>
            {/* 중앙 알림창 */}
            <div
                className={`bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-sm mx-auto transition-all duration-300 transform ${
                    visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                <p className="text-center text-gray-900 text-base">{message}</p>
                <div className="mt-6">
                    <button
                        onClick={handleClose}
                        className="w-full py-2 bg-blue-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertNotification;
