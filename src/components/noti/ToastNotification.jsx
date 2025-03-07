import React, { useState, useEffect } from "react";

const ToastNotification = ({ message, type = "success", duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(false);

    // 컴포넌트가 마운트되면 표시하고, duration 후 사라지도록 처리
    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            // 애니메이션 후 onClose 호출 (300ms)
            setTimeout(() => {
                onClose && onClose();
            }, 300);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    // type에 따라 배경색 변경 (예시: 성공은 녹색, 기본은 파란색)
    const bgColor = type === "success" ? "bg-green-500" : "bg-blue-500";

    return (
        <div
            className={`fixed top-4 right-4 z-50 transition-all duration-300 transform 
      ${visible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"} 
      ${bgColor} text-white px-4 py-2 rounded shadow-lg`}
        >
            {message}
        </div>
    );
};

export default ToastNotification;
