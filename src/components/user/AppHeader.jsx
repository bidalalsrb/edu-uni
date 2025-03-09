// components/AppHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "/public/bultiger.png";

const AppHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        // 헤더를 절대 위치로 설정하여 부모의 레이아웃에 영향주지 않음
        <header className="absolute top-0 left-0 right-0 border-b p-4 flex items-center justify-center h-20 bg-white">
            <img src={logo} alt="logo" className="w-60 object-contain" />
            <button
                onClick={handleLogout}
                className="absolute right-4 top-4 px-4 py-2 bg-red-500 text-white font-semibold rounded"
            >
                로그아웃
            </button>
        </header>
    );
};

export default AppHeader;
