// components/BottomNavBar.jsx
import React from "react";
import { HomeIcon, PencilSquareIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function BottomNavBar() {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
            <div className="w-full max-w-4xl mx-auto bg-white border-t border-gray-200 shadow-sm flex justify-around items-center py-2">
                {/* 신청하기 */}
                <button
                    onClick={() => navigate("/apply")}
                    className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition-colors"
                >
                    <PencilSquareIcon className="w-6 h-6 mb-1" />
                    <span className="text-xs">신청하기</span>
                </button>
                {/* 홈 */}
                <button
                    onClick={() => navigate("/joinList")}
                    className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition-colors"
                >
                    <HomeIcon className="w-6 h-6 mb-1" />
                    <span className="text-xs">홈</span>
                </button>
                {/* 신청내역 */}
                <button
                    onClick={() => alert("내역")}
                    className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition-colors"
                >
                    <ClipboardDocumentListIcon className="w-6 h-6 mb-1" />
                    <span className="text-xs">신청내역</span>
                </button>
            </div>
        </div>
    );
}

export default BottomNavBar;
