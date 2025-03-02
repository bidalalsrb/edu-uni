import React from "react";
import { useNavigate } from "react-router-dom";
import ExpoAttendance from "./ExpoAttendance";
import OpenExpo from "./OpenExpo";

function JoinList() {
    const navigate = useNavigate();

    // 로그아웃 시 로그인 화면으로 이동
    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* 메인 컨테이너 (흰색 배경, 중앙 정렬) */}
            <div className="w-[70%] mx-auto min-h-screen bg-white">
                {/* 상단 헤더: 로고 중앙, 로그아웃 버튼 우측 상단 */}
                <div className="relative border-b p-4">
                    {/* 로고 중앙 배치 */}
                    <div className="flex justify-center">
                        <img
                            src="/public/logo.png"
                            alt="logo"
                            className="w-60 object-contain"
                        />
                    </div>
                    {/* 로그아웃 버튼 */}
                    <button
                        onClick={handleLogout}
                        className="absolute right-4 top-4 px-4 py-2 bg-red-500 text-white font-semibold rounded"
                    >
                        로그아웃
                    </button>
                </div>

                {/* 오픈 박람회 내용 */}
                <OpenExpo />

                {/* 박람회 참석 내역 컴포넌트 */}
                <ExpoAttendance />
            </div>
        </div>
    );
}

export default JoinList;
