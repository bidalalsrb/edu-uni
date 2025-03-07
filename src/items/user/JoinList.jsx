import React from "react";
import { useNavigate } from "react-router-dom";
import ExpoAttendance from "../../components/user/ExpoAttendance.jsx";
import OpenExpo from "../../components/user/OpenExpo.jsx";
import logo from "/public/bultiger.png";

function JoinList() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto min-h-screen bg-white shadow-md rounded-md">
                {/* 헤더 */}
                <header className="relative border-b p-4 flex items-center justify-center">
                    <img src={logo} alt="logo" className="w-60 object-contain" />
                    <button
                        onClick={handleLogout}
                        className="absolute right-4 top-4 px-4 py-2 bg-red-500 text-white font-semibold rounded"
                    >
                        로그아웃
                    </button>
                </header>

                {/* 메인 컨텐츠 */}
                <main className="p-4 space-y-6">
                    <OpenExpo />
                    <ExpoAttendance />
                </main>
            </div>
        </div>
    );
}

export default JoinList;
