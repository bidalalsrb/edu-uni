import React from "react";
import {useNavigate} from "react-router-dom";
import logo from "/public/bultiger.png";

const AppHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 로그아웃 로직 (필요시 localStorage.clear() 등)
        navigate("/");
    };

    return (
        <header
            className="
                w-full fixed top-0 left-0 z-50
                bg-white border-b shadow-sm
                h-16 flex items-center
            "
            style={{minHeight: "4rem"}}
        >
            {/* 가운데 정렬을 위한 relative 컨테이너 */}
            <div className="w-full max-w-3xl mx-auto relative flex items-center justify-center px-4 md:px-8">
                {/* 로고 - 정확히 중앙에 오도록 absolute + left 1/2 + translate-x-1/2 */}
                <img
                    src={logo}
                    alt="logo"
                    className="absolute left-1/2 transform -translate-x-1/2 h-8 md:h-10 w-auto object-contain"
                    style={{maxWidth: 180}}
                />
                {/* 로그아웃 버튼 - 우측 끝 */}
                <button
                    onClick={handleLogout}
                    className="
                        ml-auto
                        px-5 py-2 md:px-7 md:py-3
                        h-10 md:h-12
                        min-w-[100px] md:min-w-[140px]
                        text-base md:text-lg
                        bg-red-500 hover:bg-red-600
                        text-white font-semibold rounded-lg
                        shadow transition active:scale-95
                    "
                >
                    로그아웃
                </button>
            </div>
        </header>
    );
};

export default AppHeader;
