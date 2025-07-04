import React from "react";

function AdminHeader() {
    return (<header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center shadow-sm relative">
        {/* 오른쪽: 사용자/버튼 */}
        <div className="flex items-center space-x-4 ml-auto z-10">
            <span className="text-sm text-gray-700">남상민</span>
            <button
                type="button"
                className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg
                        hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
                        dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                로그아웃
            </button>
        </div>
        {/* 진짜 전체화면 정중앙 */}
        <div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none h-full">
    <span className="text-lg font-semibold text-gray-800 pointer-events-none h-full">
        <img src="/uni_logo.png" alt="로고" className="h-full object-contain"/>
    </span>
        </div>
    </header>);
}

export default AdminHeader;
