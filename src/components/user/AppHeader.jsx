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
            <div className="w-full max-w-3xl mx-auto flex items-center px-4 md:px-8 relative h-16">
                {/* 가운데 로고 (중앙에 절대배치) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img
                        src={logo}
                        alt="logo"
                        className="h-8 md:h-10 w-auto object-contain"
                        style={{maxWidth: 180}}
                    />
                </div>
                {/* 우측 로그아웃 버튼 */}
                <div className="ml-auto z-10">
                    <button type="button"
                            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg
                hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
