// components/BottomNavBar.jsx
import React from "react";
import { HomeIcon, PencilSquareIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";

function BottomNavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로에 따른 active 상태 설정
    const isHomeActive = location.pathname === "/joinList";
    const isApplyActive = location.pathname === "/apply";
    const isApplyListActive = location.pathname === "/mypage";

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
            <div className="w-full max-w-4xl mx-auto bg-white border-t border-gray-200 shadow-sm flex justify-around items-center py-2">
                {/* 신청하기 */}
                <button
                    onClick={() => navigate("/apply")}
                    className={`flex flex-col items-center transition-colors ${
                        isApplyActive ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
                    }`}
                >
                    <PencilSquareIcon className="w-6 h-6 mb-1" />
                    <span className="text-xs">신청하기</span>
                </button>
                {/* 홈 */}
                <button
                    onClick={() => navigate("/joinList")}
                    className={`flex flex-col items-center transition-colors ${
                        isHomeActive ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
                    }`}
                >
                    <HomeIcon className="w-6 h-6 mb-1" />
                    <span className="text-xs">홈</span>
                </button>
                {/* 신청내역 */}
                <button
                    onClick={() =>navigate("/mypage")}
                    className={`flex flex-col items-center transition-colors ${
                        isApplyListActive ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
                    }`}
                >
                    <ClipboardDocumentListIcon className="w-6 h-6 mb-1" />
                    <span className="text-xs">마이페이지</span>
                </button>
            </div>
        </div>
    );
}

export default BottomNavBar;
